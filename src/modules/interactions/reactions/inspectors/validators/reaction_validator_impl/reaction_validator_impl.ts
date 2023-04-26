import { Injectable } from '@nestjs/common';
import { ReactionValidator } from '../reaction_validator';
import { Db } from 'src/data/database/db/db';
import { CoreValidatorImpl } from 'src/modules/core/inspectors/validators/core_validator_impl/core_validator_impl';
import { ValidationResult } from 'src/modules/core/data_models/validation_result';
import { CreateReactionDTO } from '../../../data_models/dtos/create_reaction_dto';
import { UpdateReactionDTO } from '../../../data_models/dtos/update_reaction_dto';
import { BaseParam } from 'src/modules/core/data_models/params/base_param';
import { ReactionValidationErrors } from '../../../helpers/constant';
import { ProcessReult } from 'src/modules/core/data_models/enums/process_result';
import { Reaction } from 'src/data/database/models/reaction';

@Injectable()
export class ReactionValidatorImpl extends CoreValidatorImpl implements ReactionValidator {
    constructor(private readonly database: Db) {
        super()
    }
    noReactionCreationBlocked(param: BaseParam<CreateReactionDTO>): Promise<ValidationResult> {
        return new Promise(async (resolve, _) => {
            // there are no restrictions on temporary reaction creation now, maybe will be in future
            // the restriction may be related to prevent user from doing any action on others inteactions
            resolve(ValidationResult.buildSuccess())
        });
    }
    canUpdateReaction(param: BaseParam<UpdateReactionDTO>): Promise<ValidationResult> {
        return new Promise(async (resolve, _) => {
            // there are no restrictions on temporary reaction update now, maybe will be in future
            // the restriction may be related to prevent user from doing any action on others inteactions
            let reaction = await Reaction.findOne({ where: { id: param.getPathParam()['reactionId'] } })

            resolve(reaction.userId == param.getMetaData().userId ?
                ValidationResult.buildSuccess() :
                ValidationResult.build(null,
                    ReactionValidationErrors.CAN_NOT_UPDATE_REACTION,
                    ProcessReult.failure,
                    'reaction', 'update', {}))
        });
    }
    canDeleteReaction(param: BaseParam<any>): Promise<ValidationResult> {
        return new Promise(async (resolve, _) => {
            // there are no restrictions on temporary reaction delete now, maybe will be in future
            // the restriction may be related to prevent user from doing any action on others inteactions
            let reaction = await Reaction.findOne({ where: { id: param.getPathParam()['reactionId'] } })

            resolve(reaction.userId == param.getMetaData().userId ?
                ValidationResult.buildSuccess() :
                ValidationResult.build(null,
                    ReactionValidationErrors.CAN_NOT_DELETE_REACTION,
                    ProcessReult.failure,
                    'reaction', 'delete', {}))
        });
    }
    noReactionsDisplayBlocked(param: BaseParam<any>): Promise<ValidationResult> {
        return new Promise(async (resolve, _) => {
            // there are no restrictions on temporary reactions display now, maybe will be in future
            // the restriction may be related to prevent user from doing any action on others inteactions  
            resolve(ValidationResult.buildSuccess())
        });
    }
}
