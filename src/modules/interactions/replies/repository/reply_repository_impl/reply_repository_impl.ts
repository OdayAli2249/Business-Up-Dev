import { Injectable } from '@nestjs/common';
import { ReplyRepository } from '../reply_repository';
import { ReplyDataSourceImpl } from '../../data_source/reply_data_source_impl/reply_data_source_impl';
import { ReplyHandlersWrapper } from '../../inspectors/handlers/reply_handlers_wrapper/reply_handlers_wrapper';
import { CoreRepositoryImpl } from 'src/modules/core/repository/core_repository_impl/core_repository_impl';
import { FailureOr } from 'src/modules/core/data_models/failure_or';
import { BaseParam } from 'src/modules/core/data_models/params/base_param';
import { BaseCreateResponse } from 'src/modules/core/data_models/responses/base_create_response';
import { BaseDeleteResponse } from 'src/modules/core/data_models/responses/base_delete_response';
import { BaseReadResponse } from 'src/modules/core/data_models/responses/base_read_response';
import { BaseUpdateResponse } from 'src/modules/core/data_models/responses/base_update_response';
import { CreateReplyDTO } from '../../data_models/dtos/create_reply_dto';
import { UpdateReplyDTO } from '../../data_models/dtos/update_reply_dto';
import { ReplyEntity } from '../../data_models/entities/reply_entity';

@Injectable()
export class ReplyRepositoryImpl extends CoreRepositoryImpl implements ReplyRepository {
    constructor(private readonly replyHandlersWrapper: ReplyHandlersWrapper, private readonly replyDataSource: ReplyDataSourceImpl) {
        super()
    }
    createReply(param: BaseParam<CreateReplyDTO>): Promise<FailureOr<BaseCreateResponse>> {
        return this.replyHandlersWrapper.handle(param, () => {
            return new Promise(async (resolve, reject) => {
                let response: BaseCreateResponse;
                try {
                    response = await this.replyDataSource.createReply(param);
                    resolve(response);
                } catch (err) {
                    reject(err);
                }
            })
        })
    }
    updateReply(param: BaseParam<UpdateReplyDTO>): Promise<FailureOr<BaseUpdateResponse>> {
        return this.replyHandlersWrapper.handle(param, () => {
            return new Promise(async (resolve, reject) => {
                let response: BaseUpdateResponse;
                try {
                    response = await this.replyDataSource.updateReply(param);
                    resolve(response);
                } catch (err) {
                    reject(err);
                }
            })
        })
    }
    deleteReply(param: BaseParam<any>): Promise<FailureOr<BaseDeleteResponse>> {
        return this.replyHandlersWrapper.handle(param, () => {
            return new Promise(async (resolve, reject) => {
                let response: BaseDeleteResponse;
                try {
                    response = await this.replyDataSource.deleteReply(param);
                    resolve(response);
                } catch (err) {
                    reject(err);
                }
            })
        })
    }
    getReplies(param: BaseParam<any>): Promise<FailureOr<BaseReadResponse<ReplyEntity>>> {
        return this.replyHandlersWrapper.handle(param, () => {
            return new Promise(async (resolve, reject) => {
                let response: BaseReadResponse<ReplyEntity>;
                try {
                    response = await this.replyDataSource.getReplies(param);
                    resolve(response);
                } catch (err) {
                    reject(err);
                }
            })
        })
    }
}
