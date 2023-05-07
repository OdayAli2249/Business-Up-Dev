import { Injectable } from '@nestjs/common';
import { ReactionValidatorImpl } from '../reaction_validator_impl/reaction_validator_impl';
import { CoreValidatorsWrapper } from 'src/modules/core/inspectors/validators/core_validators_wrapper';
import { BaseDTO } from 'src/modules/core/data_models/dtos/base_dto';
import { BaseParam } from 'src/modules/core/data_models/params/base_param';
import { ValidationResult } from 'src/modules/core/data_models/validation_result';
import { ReactionValidationCases } from '../../../helpers/constant';
import { UpdateReactionDTO } from '../../../data_models/dtos/update_reaction_dto';
import { CreateReactionDTO } from '../../../data_models/dtos/create_reaction_dto';

@Injectable()
export class ReactionValidatorsWrapper extends CoreValidatorsWrapper {
    constructor(private readonly reactionValidator: ReactionValidatorImpl) {
        super(reactionValidator);
    }

    checkFor<T extends BaseDTO>(validationCase: string, param: BaseParam<T>): Promise<ValidationResult> {
        return new Promise(async (resolve, _) => {
            let result: ValidationResult | void;
            try {
                switch (validationCase) {
                    case ReactionValidationCases.CAN_DELETE_REACTION: {
                        result = await this.reactionValidator.canDeleteReaction(param);
                        resolve(result);
                        break;
                    }
                    case ReactionValidationCases.CAN_UPDATE_REACTION: {
                        result = await this.reactionValidator.canUpdateReaction(
                            (param as unknown) as BaseParam<UpdateReactionDTO>
                        )

                        resolve(result);
                        break;
                    }
                    case ReactionValidationCases.NO_REACTION_CREATION_BLOCK: {
                        result = await this.reactionValidator.noReactionCreationBlocked(
                            (param as unknown) as BaseParam<CreateReactionDTO>
                        )

                        resolve(result);
                        break;
                    }
                    case ReactionValidationCases.NO_REACTION_DISPLAY_BLOCK: {
                        result = await this.reactionValidator.noReactionsDisplayBlocked(
                            param
                        )

                        resolve(result);
                        break;
                    }
                    default: {
                        result = await this.checkForCore(validationCase, param);
                        resolve(result);
                        break;
                    }
                }
            } catch (err) {
                // resolve for database errors from validations
                // or type parsing error
                // but for now, we consider both as database error
                resolve(ValidationResult.buildDatabaseError())
            }
        });
    }
}
