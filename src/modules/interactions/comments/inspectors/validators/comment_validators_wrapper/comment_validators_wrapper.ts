import { Injectable } from '@nestjs/common';
import { CommentValidatorImpl } from '../comment_validator_impl/comment_validator_impl';
import { CoreValidatorsWrapper } from 'src/modules/core/inspectors/validators/core_validators_wrapper';
import { BaseDTO } from 'src/modules/core/data_models/dtos/base_dto';
import { BaseParam } from 'src/modules/core/data_models/params/base_param';
import { ValidationResult } from 'src/modules/core/data_models/validation_result';
import { CommentValidationCases } from '../../../helpers/constant';
import { UpdateCommentDTO } from '../../../data_models/dtos/update_comment_dto';
import { CreateCommentDTO } from '../../../data_models/dtos/create_comment_dto';

@Injectable()
export class CommentValidatorsWrapper extends CoreValidatorsWrapper {
    constructor(private readonly commentValidator: CommentValidatorImpl) {
        super(commentValidator);
    }

    checkFor<T extends BaseDTO>(validationCase: string, param: BaseParam<T>): Promise<ValidationResult> {
        return new Promise(async (resolve, _) => {
            let result: ValidationResult | void;
            try {
                switch (validationCase) {
                    case CommentValidationCases.CAN_DELETE_COMMENT: {
                        result = await this.commentValidator.canDeleteComment(param);
                        resolve(result);
                        break;
                    }
                    case CommentValidationCases.CAN_UPDATE_COMMENT: {
                        result = await this.commentValidator.canUpdateComment(
                            (param as unknown) as BaseParam<UpdateCommentDTO>
                        )

                        resolve(result);
                        break;
                    }
                    case CommentValidationCases.NO_COMMENT_CREATION_BLOCK: {
                        result = await this.commentValidator.noCommentCreationBlocked(
                            (param as unknown) as BaseParam<CreateCommentDTO>
                        )

                        resolve(result);
                        break;
                    }
                    case CommentValidationCases.NO_COMMENT_DISPLAY_BLOCK: {
                        result = await this.commentValidator.noCommentsDisplayBlocked(
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
