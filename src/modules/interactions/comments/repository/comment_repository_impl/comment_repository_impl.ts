import { Injectable } from '@nestjs/common';
import { CommentRepository } from '../comment_repository';
import { CommentDataSourceImpl } from '../../data_source/comment_data_source_impl/comment_data_source_impl';
import { CommentHandlersWrapper } from '../../inspectors/handlers/comment_handlers_wrapper/comment_handlers_wrapper';
import { CoreRepositoryImpl } from 'src/modules/core/repository/core_repository_impl/core_repository_impl';
import { FailureOr } from 'src/modules/core/data_models/failure_or';
import { BaseParam } from 'src/modules/core/data_models/params/base_param';
import { BaseCreateResponse } from 'src/modules/core/data_models/responses/base_create_response';
import { BaseDeleteResponse } from 'src/modules/core/data_models/responses/base_delete_response';
import { BaseReadResponse } from 'src/modules/core/data_models/responses/base_read_response';
import { BaseUpdateResponse } from 'src/modules/core/data_models/responses/base_update_response';
import { CreateCommentDTO } from '../../data_models/dtos/create_comment_dto';
import { UpdateCommentDTO } from '../../data_models/dtos/update_comment_dto';
import { CommentEntity } from '../../data_models/entities/comment_entity';

@Injectable()
export class CommentRepositoryImpl extends CoreRepositoryImpl implements CommentRepository {
    constructor(private readonly commentHandlersWrapper: CommentHandlersWrapper, private readonly commentDataSource: CommentDataSourceImpl) {
        super()
    }
    createComment(param: BaseParam<CreateCommentDTO>): Promise<FailureOr<BaseCreateResponse>> {
        return this.commentHandlersWrapper.handle(param, () => {
            return new Promise(async (resolve, reject) => {
                let response: BaseCreateResponse;
                try {
                    response = await this.commentDataSource.createComment(param);
                    resolve(response);
                } catch (err) {
                    reject(err);
                }
            })
        })
    }
    updateComment(param: BaseParam<UpdateCommentDTO>): Promise<FailureOr<BaseUpdateResponse>> {
        return this.commentHandlersWrapper.handle(param, () => {
            return new Promise(async (resolve, reject) => {
                let response: BaseUpdateResponse;
                try {
                    response = await this.commentDataSource.updateComment(param);
                    resolve(response);
                } catch (err) {
                    reject(err);
                }
            })
        })
    }
    deleteComment(param: BaseParam<any>): Promise<FailureOr<BaseDeleteResponse>> {
        return this.commentHandlersWrapper.handle(param, () => {
            return new Promise(async (resolve, reject) => {
                let response: BaseDeleteResponse;
                try {
                    response = await this.commentDataSource.deleteComment(param);
                    resolve(response);
                } catch (err) {
                    reject(err);
                }
            })
        })
    }
    getComments(param: BaseParam<any>): Promise<FailureOr<BaseReadResponse<CommentEntity>>> {
        return this.commentHandlersWrapper.handle(param, () => {
            return new Promise(async (resolve, reject) => {
                let response: BaseReadResponse<CommentEntity>;
                try {
                    response = await this.commentDataSource.getComments(param);
                    resolve(response);
                } catch (err) {
                    reject(err);
                }
            })
        })
    }
}
