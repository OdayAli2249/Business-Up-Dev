import { Injectable } from '@nestjs/common';
import { ServiceValidatorImpl } from '../service_validator_impl/service_validator_impl';
import { CoreValidatorsWrapper } from 'src/modules/core/inspectors/validators/core_validators_wrapper';
import { BaseDTO } from 'src/modules/core/data_models/dtos/base_dto';
import { BaseParam } from 'src/modules/core/data_models/params/base_param';
import { ValidationResult } from 'src/modules/core/data_models/validation_result';
import { ServiceValidationCases } from '../../../helpers/constants';
import { CreateServiceDTO } from '../../../data_models/dtos/create_service_dto';
import { UpdateServiceDTO } from '../../../data_models/dtos/update_service_dto';

@Injectable()
export class ServiceValidatorsWrapper extends CoreValidatorsWrapper {
    constructor(private readonly serviceValidator: ServiceValidatorImpl) {
        super(serviceValidator);
    }

    checkFor<T extends BaseDTO>(validationCase: string, param: BaseParam<T>): Promise<ValidationResult> {
        return new Promise(async (resolve, _) => {
            let result: ValidationResult | void;
            try {
                switch (validationCase) {
                    case ServiceValidationCases.CAN_DISPLAY_SERVICES: {
                        result = await this.serviceValidator.canDisplayServices(param);
                        resolve(result);
                        break;
                    }
                    case ServiceValidationCases.NO_TEMPORARY_SERVICE_CREATE_DENY: {
                        result = await this.serviceValidator.noTemporaryServiceCreateDeny(
                            (param as unknown) as BaseParam<CreateServiceDTO>
                        )

                        resolve(result);
                        break;
                    }
                    case ServiceValidationCases.NO_TEMPORARY_SERVICE_DELETE_DENY: {
                        result = await this.serviceValidator.noTemporaryServiceDeleteDeny(
                            param
                        )

                        resolve(result);
                        break;
                    }
                    case ServiceValidationCases.NO_TEMPORARY_SERVICE_UPDATE_DENY: {
                        result = await this.serviceValidator.noTemporaryServiceUpdateDeny(
                            (param as unknown) as BaseParam<UpdateServiceDTO>
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
