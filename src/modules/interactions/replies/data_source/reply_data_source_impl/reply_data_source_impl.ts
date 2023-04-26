import { Injectable } from '@nestjs/common';
import { ReplyDataSource } from '../reply_data_source';
import { Db } from 'src/data/database/db/db';
import { ReplyValidatorsWrapper } from '../../inspectors/validators/reply_validators_wrapper/reply_validators_wrapper';
import { CoreDataSourceImpl } from 'src/modules/core/data_source/core_data_source_impl/core_data_source_impl';
import { BaseCreateResponse } from 'src/modules/core/data_models/responses/base_create_response';
import { BaseDeleteResponse } from 'src/modules/core/data_models/responses/base_delete_response';
import { BaseReadResponse } from 'src/modules/core/data_models/responses/base_read_response';
import { BaseUpdateResponse } from 'src/modules/core/data_models/responses/base_update_response';
import { CreateReplyDTO } from '../../data_models/dtos/create_reply_dto';
import { UpdateReplyDTO } from '../../data_models/dtos/update_reply_dto';
import { ReplyEntity } from '../../data_models/entities/reply_entity';
import { BaseParam } from 'src/modules/core/data_models/params/base_param';
import { CUDResponseObjects } from 'src/modules/core/data_models/enums/cud_response_objects';
import { ReplyValidationCases } from '../../helpers/constants';
import { Reply } from 'src/data/database/models/reply';

@Injectable()
export class ReplyDataSourceImpl extends CoreDataSourceImpl implements ReplyDataSource {
    constructor(private readonly database: Db, private readonly replyValidatorsWrapper: ReplyValidatorsWrapper) {
        super()
    }
    createReply(param: BaseParam<CreateReplyDTO>): Promise<BaseCreateResponse> {
        return this.replyValidatorsWrapper.validate<BaseCreateResponse, CreateReplyDTO>(param, () => {
            return new Promise<BaseCreateResponse>(async (resolve, reject) => {
                try {
                    let replyEntity = param.getData().reply;
                    replyEntity.userId = param.getMetaData().userId;
                    let createReplyQueryParam = param.getQueryParam();
                    let serviceProviderId = createReplyQueryParam['serviceProviderId'];
                    if (serviceProviderId)
                        replyEntity.serviceProviderId = serviceProviderId;
                    replyEntity.commentId = createReplyQueryParam['commentId']
                    // passing entity object from directly from cloud my cause errors, so test this
                    let reply = await Reply.create(replyEntity)
                    resolve(BaseCreateResponse.build(reply.id, CUDResponseObjects.reply));
                } catch (err) {
                    reject(err)
                }
            });

        },
            [
                ReplyValidationCases.NO_REPLY_CREATION_BLOCK,
            ])
    }
    updateReply(param: BaseParam<UpdateReplyDTO>): Promise<BaseUpdateResponse> {
        return this.replyValidatorsWrapper.validate<BaseUpdateResponse, UpdateReplyDTO>(param, () => {
            return new Promise<BaseUpdateResponse>(async (resolve, reject) => {
                try {
                    // passing entity object from directly from cloud my cause errors, so test this
                    await Reply.update(param.getData().reply, {
                        where: {
                            id: param.getPathParam()['replyId']
                        }
                    })
                    resolve(BaseUpdateResponse.build(0, CUDResponseObjects.reply));
                } catch (err) {
                    reject(err)
                }
            });

        },
            [
                ReplyValidationCases.CAN_UPDATE_REPLY,
            ])
    }
    deleteReply(param: BaseParam<any>): Promise<BaseDeleteResponse> {
        return this.replyValidatorsWrapper.validate<BaseDeleteResponse, any>(param, () => {
            return new Promise<BaseDeleteResponse>(async (resolve, reject) => {
                try {
                    await Reply.destroy({
                        where: {
                            id: param.getPathParam()['replyId']
                        }
                    })
                    resolve(BaseDeleteResponse.build(0, CUDResponseObjects.reply));
                } catch (err) {
                    reject(err)
                }
            });

        },
            [
                ReplyValidationCases.CAN_DELETE_REPLY,
            ])
    }
    getReplies(param: BaseParam<any>): Promise<BaseReadResponse<ReplyEntity>> {
        return this.replyValidatorsWrapper.validate<BaseReadResponse<ReplyEntity>, any>(param, () => {
            return new Promise<BaseReadResponse<ReplyEntity>>(async (resolve, reject) => {
                try {
                    let getRepliesPathParam = param.getPathParam();
                    let replies = await Reply.findAll({ where: { commentId: getRepliesPathParam['commentId'] } });
                    resolve(BaseReadResponse.build(await ReplyEntity.buildListFromModel(replies, [])));
                } catch (err) {
                    reject(err)
                }
            });

        },
            [
                ReplyValidationCases.NO_REPLY_DISPLAY_BLOCK,
            ])
    }
}
