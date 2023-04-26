import { Injectable } from '@nestjs/common';
import { ReactionDataSource } from '../reaction_data_source';
import { Db } from 'src/data/database/db/db';
import { ReactionValidatorsWrapper } from '../../inspectors/validators/reaction_validators_wrapper/reaction_validators_wrapper';
import { CoreDataSourceImpl } from 'src/modules/core/data_source/core_data_source_impl/core_data_source_impl';
import { BaseCreateResponse } from 'src/modules/core/data_models/responses/base_create_response';
import { BaseDeleteResponse } from 'src/modules/core/data_models/responses/base_delete_response';
import { BaseReadResponse } from 'src/modules/core/data_models/responses/base_read_response';
import { BaseUpdateResponse } from 'src/modules/core/data_models/responses/base_update_response';
import { CreateReactionDTO } from '../../data_models/dtos/create_reaction_dto';
import { UpdateReactionDTO } from '../../data_models/dtos/update_reaction_dto';
import { ReactionEntity } from '../../data_models/entities/reaction_entity';
import { BaseParam } from 'src/modules/core/data_models/params/base_param';
import { CUDResponseObjects } from 'src/modules/core/data_models/enums/cud_response_objects';
import { ReactionValidationCases } from '../../helpers/constant';
import { Reaction } from 'src/data/database/models/reaction';

@Injectable()
export class ReactionDataSourceImpl extends CoreDataSourceImpl implements ReactionDataSource {
    constructor(private readonly database: Db, private readonly reactionValidatorsWrapper: ReactionValidatorsWrapper) {
        super()
    }
    createReaction(param: BaseParam<CreateReactionDTO>): Promise<BaseCreateResponse> {
        return this.reactionValidatorsWrapper.validate<BaseCreateResponse, CreateReactionDTO>(param, () => {
            return new Promise<BaseCreateResponse>(async (resolve, reject) => {
                try {
                    let reactionEntity = param.getData().reaction;
                    reactionEntity.userId = param.getMetaData().userId;
                    let serviceProviderId = param.getQueryParam()['serviceProviderId'];
                    let createReactionQueryParam = param.getQueryParam();
                    let postId = createReactionQueryParam['postId']
                    if (serviceProviderId)
                        reactionEntity.serviceProviderId = serviceProviderId;
                    if (postId)
                        reactionEntity.postId = postId;
                    else reactionEntity.serviceId = createReactionQueryParam['serviceId'];
                    // passing entity object from directly from cloud my cause errors, so test this
                    let reaction = await Reaction.create(reactionEntity);
                    resolve(BaseCreateResponse.build(reaction.id, CUDResponseObjects.reaction));
                } catch (err) {
                    reject(err)
                }
            });

        },
            [
                ReactionValidationCases.NO_REACTION_CREATION_BLOCK,
            ])
    }
    updateReaction(param: BaseParam<UpdateReactionDTO>): Promise<BaseUpdateResponse> {
        return this.reactionValidatorsWrapper.validate<BaseUpdateResponse, UpdateReactionDTO>(param, () => {
            return new Promise<BaseUpdateResponse>(async (resolve, reject) => {
                try {
                    // passing entity object from directly from cloud my cause errors, so test this
                    // it gonna be disaster if user add ids to this object
                    // for example: reaction contain postId, and in update, we found in the object random service id
                    // and we add this id to database
                    await Reaction.update(param.getData().reaction, {
                        where: {
                            id: param.getPathParam()['reactionId']
                        }
                    })
                    resolve(BaseUpdateResponse.build(0, CUDResponseObjects.reaction));
                } catch (err) {
                    reject(err)
                }
            });

        },
            [
                ReactionValidationCases.CAN_UPDATE_REACTION,
            ])
    }
    deleteReaction(param: BaseParam<any>): Promise<BaseDeleteResponse> {
        return this.reactionValidatorsWrapper.validate<BaseDeleteResponse, any>(param, () => {
            return new Promise<BaseDeleteResponse>(async (resolve, reject) => {
                try {
                    await Reaction.destroy({
                        where: {
                            id: param.getPathParam()['reactionId']
                        }
                    })
                    resolve(BaseDeleteResponse.build(0, CUDResponseObjects.reaction));
                } catch (err) {
                    reject(err)
                }
            });

        },
            [
                ReactionValidationCases.CAN_DELETE_REACTION,
            ])
    }
    getReactions(param: BaseParam<any>): Promise<BaseReadResponse<ReactionEntity>> {
        return this.reactionValidatorsWrapper.validate<BaseReadResponse<ReactionEntity>, any>(param, () => {
            return new Promise<BaseReadResponse<ReactionEntity>>(async (resolve, reject) => {
                try {
                    let getReactionsQueryParam = param.getQueryParam();
                    const condition = getReactionsQueryParam['postId'] ? { postId: getReactionsQueryParam['postId'] }
                        : { serviceId: getReactionsQueryParam['serviceId'] };
                    let reactions = await Reaction.findAll({ where: condition });
                    resolve(BaseReadResponse.build(await ReactionEntity.buildListFromModel(reactions, [])));
                } catch (err) {
                    reject(err)
                }
            });

        },
            [
                ReactionValidationCases.NO_REACTION_DISPLAY_BLOCK,
            ])
    }
}
