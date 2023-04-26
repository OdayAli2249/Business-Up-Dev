import { Injectable } from '@nestjs/common';
import { CommentDataSource } from '../comment_data_source';
import { CommentValidatorsWrapper } from '../../inspectors/validators/comment_validators_wrapper/comment_validators_wrapper';
import { Db } from 'src/data/database/db/db';
import { CoreDataSourceImpl } from 'src/modules/core/data_source/core_data_source_impl/core_data_source_impl';
import { BaseCreateResponse } from 'src/modules/core/data_models/responses/base_create_response';
import { BaseDeleteResponse } from 'src/modules/core/data_models/responses/base_delete_response';
import { BaseReadResponse } from 'src/modules/core/data_models/responses/base_read_response';
import { BaseUpdateResponse } from 'src/modules/core/data_models/responses/base_update_response';
import { CreateCommentDTO } from '../../data_models/dtos/create_comment_dto';
import { UpdateCommentDTO } from '../../data_models/dtos/update_comment_dto';
import { CommentEntity } from '../../data_models/entities/comment_entity';
import { BaseParam } from 'src/modules/core/data_models/params/base_param';
import { CUDResponseObjects } from 'src/modules/core/data_models/enums/cud_response_objects';
import { CommentValidationCases } from '../../helpers/constant';
import { Comment } from 'src/data/database/models/comment';

@Injectable()
export class CommentDataSourceImpl extends CoreDataSourceImpl implements CommentDataSource {
    constructor(private readonly database: Db, private readonly commentValidatorsWrapper: CommentValidatorsWrapper) {
        super()
    }
    createComment(param: BaseParam<CreateCommentDTO>): Promise<BaseCreateResponse> {
        return this.commentValidatorsWrapper.validate<BaseCreateResponse, CreateCommentDTO>(param, () => {
            return new Promise<BaseCreateResponse>(async (resolve, reject) => {
                try {
                    // TO DO optional : check if postId or serviceId belong to serviceProviderId
                    // OR use database queries to obtain serviceProviderId instead of obtaining it from query param
                    let commentEntity = param.getData().comment;
                    commentEntity.userId = param.getMetaData().userId;
                    let serviceProviderId = param.getQueryParam()['serviceProviderId'];
                    let createCommentQueryParam = param.getQueryParam();
                    let postId = createCommentQueryParam['postId']
                    if (serviceProviderId)
                        commentEntity.serviceProviderId = serviceProviderId;
                    if (postId)
                        commentEntity.postId = postId;
                    else commentEntity.serviceId = createCommentQueryParam['serviceId'];
                    // passing entity object from directly from cloud my cause errors, so test this
                    let comment = await Comment.create(commentEntity);
                    resolve(BaseCreateResponse.build(comment.id, CUDResponseObjects.comment));
                } catch (err) {
                    reject(err)
                }
            });

        },
            [
                CommentValidationCases.NO_COMMENT_CREATION_BLOCK,
            ])
    }
    updateComment(param: BaseParam<UpdateCommentDTO>): Promise<BaseUpdateResponse> {
        return this.commentValidatorsWrapper.validate<BaseUpdateResponse, UpdateCommentDTO>(param, () => {
            return new Promise<BaseUpdateResponse>(async (resolve, reject) => {
                try {
                    // passing entity object from directly from cloud my cause errors, so test this
                    // it gonna be disaster if user add ids to this object
                    // for example: comment contain postId, and in update, we found in the object random service id
                    // and we add this id to database
                    await Comment.update(param.getData().comment, {
                        where: {
                            id: param.getPathParam()['commentId']
                        }
                    })
                    resolve(BaseUpdateResponse.build(0, CUDResponseObjects.comment));
                } catch (err) {
                    reject(err)
                }
            });

        },
            [
                CommentValidationCases.CAN_UPDATE_COMMMENT,
            ])
    }
    deleteComment(param: BaseParam<any>): Promise<BaseDeleteResponse> {
        return this.commentValidatorsWrapper.validate<BaseDeleteResponse, any>(param, () => {
            return new Promise<BaseDeleteResponse>(async (resolve, reject) => {
                try {
                    await Comment.destroy({
                        where: {
                            id: param.getPathParam()['commentId']
                        }
                    })
                    resolve(BaseDeleteResponse.build(0, CUDResponseObjects.comment));
                } catch (err) {
                    reject(err)
                }
            });

        },
            [
                CommentValidationCases.CAN_DELETE_COMMENT,
            ])
    }
    getComments(param: BaseParam<any>): Promise<BaseReadResponse<CommentEntity>> {
        return this.commentValidatorsWrapper.validate<BaseReadResponse<CommentEntity>, any>(param, () => {
            return new Promise<BaseReadResponse<CommentEntity>>(async (resolve, reject) => {
                try {
                    let getCommentsQueryParam = param.getQueryParam();
                    const condition = getCommentsQueryParam['postId'] ? { postId: getCommentsQueryParam['postId'] }
                        : { serviceId: getCommentsQueryParam['serviceId'] };
                    let comments = await Comment.findAll({ where: condition });
                    resolve(BaseReadResponse.build(await CommentEntity.buildListFromModel(comments, [])));
                } catch (err) {
                    reject(err)
                }
            });

        },
            [
                CommentValidationCases.NO_COMMENT_DISPLAY_BLOCK,
            ])
    }

}
