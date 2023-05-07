import { Injectable } from '@nestjs/common';
import { PostValidatorImpl } from '../post_validator_impl/post_validator_impl';
import { CoreValidatorsWrapper } from 'src/modules/core/inspectors/validators/core_validators_wrapper';
import { BaseDTO } from 'src/modules/core/data_models/dtos/base_dto';
import { BaseParam } from 'src/modules/core/data_models/params/base_param';
import { ValidationResult } from 'src/modules/core/data_models/validation_result';
import { PostValidationCases } from '../../../helpers/constansts';
import { CreatePostDTO } from '../../../data_models/dtos/create_post_dto';
import { UpdatePostDTO } from '../../../data_models/dtos/update_post_dto';

@Injectable()
export class PostValidatorsWrapper extends CoreValidatorsWrapper {

    constructor(private readonly postValidator: PostValidatorImpl) {
        super(postValidator);
    }

    checkFor<T extends BaseDTO>(validationCase: string, param: BaseParam<T>): Promise<ValidationResult> {
        return new Promise(async (resolve, _) => {
            let result: ValidationResult | void;
            try {
                switch (validationCase) {
                    case PostValidationCases.CAN_DISPLAY_POSTS: {
                        result = await this.postValidator.canDisplayPosts(param);
                        resolve(result);
                        break;
                    }
                    case PostValidationCases.NO_TEMPORARY_POST_CREATE_DENY: {
                        result = await this.postValidator.noTemporaryPostCreateDeny(
                            (param as unknown) as BaseParam<CreatePostDTO>
                        )

                        resolve(result);
                        break;
                    }
                    case PostValidationCases.NO_TEMPORARY_POST_DELETE_DENY: {
                        result = await this.postValidator.noTemporaryPostDeleteDeny(
                            param
                        )

                        resolve(result);
                        break;
                    }
                    case PostValidationCases.NO_TEMPORARY_POST_UPDATE_DENY: {
                        result = await this.postValidator.noTemporaryPostUpdateDeny(
                            (param as unknown) as BaseParam<UpdatePostDTO>
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
