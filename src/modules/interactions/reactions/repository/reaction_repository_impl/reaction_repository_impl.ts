import { Injectable } from '@nestjs/common';
import { ReactionRepository } from '../reaction_repository';
import { ReactionHandlersWrapper } from '../../inspectors/handlers/reaction_handlers_wrapper/reaction_handlers_wrapper';
import { ReactionDataSourceImpl } from '../../data_source/reaction_data_source_impl/reaction_data_source_impl';
import { CoreRepositoryImpl } from 'src/modules/core/repository/core_repository_impl/core_repository_impl';
import { FailureOr } from 'src/modules/core/data_models/failure_or';
import { BaseParam } from 'src/modules/core/data_models/params/base_param';
import { BaseCreateResponse } from 'src/modules/core/data_models/responses/base_create_response';
import { BaseDeleteResponse } from 'src/modules/core/data_models/responses/base_delete_response';
import { BaseReadResponse } from 'src/modules/core/data_models/responses/base_read_response';
import { BaseUpdateResponse } from 'src/modules/core/data_models/responses/base_update_response';
import { CreateReactionDTO } from '../../data_models/dtos/create_reaction_dto';
import { UpdateReactionDTO } from '../../data_models/dtos/update_reaction_dto';
import { ReactionEntity } from '../../data_models/entities/reaction_entity';

@Injectable()
export class ReactionRepositoryImpl extends CoreRepositoryImpl implements ReactionRepository {
    constructor(private readonly reactionHandlersWrapper: ReactionHandlersWrapper, private readonly reactionDataSource: ReactionDataSourceImpl) {
        super()
    }
    createReaction(param: BaseParam<CreateReactionDTO>): Promise<FailureOr<BaseCreateResponse>> {
        return this.reactionHandlersWrapper.handle(param, () => {
            return new Promise(async (resolve, reject) => {
                let response: BaseCreateResponse;
                try {
                    response = await this.reactionDataSource.createReaction(param);
                    resolve(response);
                } catch (err) {
                    reject(err);
                }
            })
        })
    }
    updateReaction(param: BaseParam<UpdateReactionDTO>): Promise<FailureOr<BaseUpdateResponse>> {
        return this.reactionHandlersWrapper.handle(param, () => {
            return new Promise(async (resolve, reject) => {
                let response: BaseUpdateResponse;
                try {
                    response = await this.reactionDataSource.updateReaction(param);
                    resolve(response);
                } catch (err) {
                    reject(err);
                }
            })
        })
    }
    deleteReaction(param: BaseParam<any>): Promise<FailureOr<BaseDeleteResponse>> {
        return this.reactionHandlersWrapper.handle(param, () => {
            return new Promise(async (resolve, reject) => {
                let response: BaseDeleteResponse;
                try {
                    response = await this.reactionDataSource.deleteReaction(param);
                    resolve(response);
                } catch (err) {
                    reject(err);
                }
            })
        })
    }
    getReactions(param: BaseParam<any>): Promise<FailureOr<BaseReadResponse<ReactionEntity>>> {
        return this.reactionHandlersWrapper.handle(param, () => {
            return new Promise(async (resolve, reject) => {
                let response: BaseReadResponse<ReactionEntity>;
                try {
                    response = await this.reactionDataSource.getReactions(param);
                    resolve(response);
                } catch (err) {
                    reject(err);
                }
            })
        })
    }
}
