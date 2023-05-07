import { Injectable } from '@nestjs/common';
import { PostDataSource } from '../post_data_source';
import { PostValidatorsWrapper } from '../../inspectors/validators/post_validators_wrapper/post_validators_wrapper';
import { Db } from 'src/data/database/db/db';
import { CoreDataSourceImpl } from 'src/modules/core/data_source/core_data_source_impl/core_data_source_impl';
import { BaseCreateResponse } from 'src/modules/core/data_models/responses/base_create_response';
import { BaseDeleteResponse } from 'src/modules/core/data_models/responses/base_delete_response';
import { BaseReadResponse } from 'src/modules/core/data_models/responses/base_read_response';
import { BaseUpdateResponse } from 'src/modules/core/data_models/responses/base_update_response';
import { CreatePostDTO } from '../../data_models/dtos/create_post_dto';
import { UpdatePostDTO } from '../../data_models/dtos/update_post_dto';
import { PostEntity } from '../../data_models/entities/post_entity';
import { BaseParam } from 'src/modules/core/data_models/params/base_param';
import { CUDResponseObjects } from 'src/modules/core/data_models/enums/cud_response_objects';
import { PostValidationCases } from '../../helpers/constansts';
import { Post } from 'src/data/database/models/post';
import { PermissionGroup } from 'src/data/database/models/permission_group';
import { Permission } from 'src/data/database/models/permission';
import { Op } from 'sequelize';
import { CoreValidationCases } from 'src/modules/core/helpers/constants';

@Injectable()
export class PostDataSourceImpl extends CoreDataSourceImpl implements PostDataSource {
    constructor(private readonly database: Db, private readonly postValidatorsWrapper: PostValidatorsWrapper) {
        super()
    }
    createPost(param: BaseParam<CreatePostDTO>): Promise<BaseCreateResponse> {
        return this.postValidatorsWrapper.validate<BaseCreateResponse, CreatePostDTO>(param, () => {
            return new Promise<BaseCreateResponse>(async (resolve, reject) => {
                try {
                    let createPostData = param.getData();
                    createPostData.post.branchId = param.getPathParam()['branchId'];
                    let post = await Post.create({ name: createPostData.post.name, branchId: createPostData.post.branchId });
                    resolve(BaseCreateResponse.build(post.id, [CUDResponseObjects.post]));
                } catch (err) {
                    reject(err)
                }
            });

        },
            [
                PostValidationCases.NO_TEMPORARY_POST_CREATE_DENY,
                CoreValidationCases.CAN_DO_THIS_ACTION
            ])
    }
    updatePost(param: BaseParam<UpdatePostDTO>): Promise<BaseUpdateResponse> {
        return this.postValidatorsWrapper.validate<BaseUpdateResponse, UpdatePostDTO>(param, () => {
            return new Promise<BaseUpdateResponse>(async (resolve, reject) => {
                try {
                    await Post.update({ name: param.getData().post.name }, {
                        where: {
                            id: param.getPathParam()['postId']
                        }
                    })
                    resolve(BaseUpdateResponse.build(0, [CUDResponseObjects.post]));
                } catch (err) {
                    reject(err)
                }
            });

        },
            [
                PostValidationCases.NO_TEMPORARY_POST_UPDATE_DENY,
                CoreValidationCases.CAN_DO_THIS_ACTION
            ])
    }
    deletePost(param: BaseParam<any>): Promise<BaseDeleteResponse> {
        return this.postValidatorsWrapper.validate<BaseDeleteResponse, any>(param, () => {
            return new Promise<BaseDeleteResponse>(async (resolve, reject) => {
                try {
                    let post = await Post.destroy({
                        where: {
                            id: param.getPathParam()['postId']
                        }
                    })
                    resolve(BaseDeleteResponse.build(post, [CUDResponseObjects.post]));
                } catch (err) {
                    reject(err)
                }
            });

        },
            [
                PostValidationCases.NO_TEMPORARY_POST_DELETE_DENY,
                CoreValidationCases.CAN_DO_THIS_ACTION
            ])
    }
    getPosts(param: BaseParam<any>): Promise<BaseReadResponse<PostEntity>> {
        return this.postValidatorsWrapper.validate<BaseReadResponse<PostEntity>, any>(param, () => {
            return new Promise<BaseReadResponse<PostEntity>>(async (resolve, reject) => {
                try {
                    let posts = await Post.findAll({
                        where: {
                            branchId: param.getPathParam()['branchId']
                        }
                    })
                    resolve(BaseReadResponse.build(await PostEntity.buildListFromModel(posts, [])));
                } catch (err) {
                    reject(err)
                }
            });

        },
            [
                PostValidationCases.CAN_DISPLAY_POSTS,
            ])
    }
    getPostsWithPermissions(param: BaseParam<any>): Promise<BaseReadResponse<PostEntity>> {
        return this.postValidatorsWrapper.validate<BaseReadResponse<PostEntity>, any>(param, () => {
            return new Promise<BaseReadResponse<PostEntity>>(async (resolve, reject) => {
                try {
                    let getPostsPathParam = param.getPathParam();
                    let posts = await Post.findAll({
                        where: {
                            branchId: getPostsPathParam['branchId']
                        }
                    });
                    let branchGroups = await PermissionGroup.findAll({ where: { branchId: getPostsPathParam['branchId'] } })
                    let postPermissions = await Permission.findAll(
                        {
                            where:
                            {
                                postId: { [Op.not]: null },
                                userId: getPostsPathParam['userId'],
                                permissionGroupId: branchGroups.map((permissionGroup) => permissionGroup.id)
                            }
                        })
                    let postEntities = await PostEntity.buildListFromModel(posts, [])
                    for (var i = 0; i < postEntities.length; i++) {
                        let actionList = [];
                        for (var j = 0; j < postPermissions.length; j++) {
                            if (postPermissions[j].postId == postEntities[i].id) {
                                actionList.push(postPermissions[j].actions)
                            }
                        }
                        postEntities[i].permissions = actionList;
                    }
                    resolve(BaseReadResponse.build(postEntities));
                } catch (err) {
                    reject(err)
                }
            });

        },
            [
                PostValidationCases.CAN_DISPLAY_POSTS,
            ])
    }
}
