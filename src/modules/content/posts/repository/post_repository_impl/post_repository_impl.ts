import { Injectable } from '@nestjs/common';
import { PostRepository } from '../post_repository';
import { PostHandlersWrapper } from '../../inspectors/handlers/post_handlers_wrapper/post_handlers_wrapper';
import { CoreRepositoryImpl } from 'src/modules/core/repository/core_repository_impl/core_repository_impl';
import { PostDataSourceImpl } from '../../data_source/post_data_source_impl/post_data_source_impl';
import { FailureOr } from 'src/modules/core/data_models/failure_or';
import { BaseParam } from 'src/modules/core/data_models/params/base_param';
import { BaseCreateResponse } from 'src/modules/core/data_models/responses/base_create_response';
import { BaseDeleteResponse } from 'src/modules/core/data_models/responses/base_delete_response';
import { BaseReadResponse } from 'src/modules/core/data_models/responses/base_read_response';
import { BaseUpdateResponse } from 'src/modules/core/data_models/responses/base_update_response';
import { CreatePostDTO } from '../../data_models/dtos/create_post_dto';
import { UpdatePostDTO } from '../../data_models/dtos/update_post_dto';
import { PostEntity } from '../../data_models/entities/post_entity';

@Injectable()
export class PostRepositoryImpl extends CoreRepositoryImpl implements PostRepository {
    constructor(private readonly postHandlersWrapper: PostHandlersWrapper, private readonly postDataSource: PostDataSourceImpl) {
        super()
    }
    createPost(param: BaseParam<CreatePostDTO>): Promise<FailureOr<BaseCreateResponse>> {
        return this.postHandlersWrapper.handle(param, () => {
            return new Promise(async (resolve, reject) => {
                let response: BaseCreateResponse;
                try {
                    response = await this.postDataSource.createPost(param);
                    resolve(response);
                } catch (err) {
                    reject(err);
                }
            })
        })
    }
    updatePost(param: BaseParam<UpdatePostDTO>): Promise<FailureOr<BaseUpdateResponse>> {
        return this.postHandlersWrapper.handle(param, () => {
            return new Promise(async (resolve, reject) => {
                let response: BaseUpdateResponse;
                try {
                    response = await this.postDataSource.updatePost(param);
                    resolve(response);
                } catch (err) {
                    reject(err);
                }
            })
        })
    }
    deletePost(param: BaseParam<any>): Promise<FailureOr<BaseDeleteResponse>> {
        return this.postHandlersWrapper.handle(param, () => {
            return new Promise(async (resolve, reject) => {
                let response: BaseDeleteResponse;
                try {
                    response = await this.postDataSource.deletePost(param);
                    resolve(response);
                } catch (err) {
                    reject(err);
                }
            })
        })
    }
    getPosts(param: BaseParam<any>): Promise<FailureOr<BaseReadResponse<PostEntity>>> {
        return this.postHandlersWrapper.handle(param, () => {
            return new Promise(async (resolve, reject) => {
                let response: BaseReadResponse<PostEntity>;
                try {
                    response = await this.postDataSource.getPosts(param);
                    resolve(response);
                } catch (err) {
                    reject(err);
                }
            })
        })
    }
    getPostsWithPermissions(param: BaseParam<any>): Promise<FailureOr<BaseReadResponse<PostEntity>>> {
        return this.postHandlersWrapper.handle(param, () => {
            return new Promise(async (resolve, reject) => {
                let response: BaseReadResponse<PostEntity>;
                try {
                    response = await this.postDataSource.getPostsWithPermissions(param);
                    resolve(response);
                } catch (err) {
                    reject(err);
                }
            })
        })
    }
}
