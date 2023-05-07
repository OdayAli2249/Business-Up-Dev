import { Injectable } from '@nestjs/common';
import { ServiceProviderValidatorImpl } from '../service_provider_validator_impl/service_provider_validator_impl';
import { CoreValidatorsWrapper } from 'src/modules/core/inspectors/validators/core_validators_wrapper';
import { BaseDTO } from 'src/modules/core/data_models/dtos/base_dto';
import { BaseParam } from 'src/modules/core/data_models/params/base_param';
import { ValidationResult } from 'src/modules/core/data_models/validation_result';
import { ServiceProviderValidationCases } from 'src/modules/service_providers/helpers/constants';
import { CreateServiceProviderDTO } from 'src/modules/service_providers/data_models/dtos/create_service_provider_dto';
import { RemoveUsersFromServiceProviderDTO } from 'src/modules/service_providers/data_models/dtos/remove_users_from_service_provider_dto';

@Injectable()
export class ServiceProviderValidatorsWrapper extends CoreValidatorsWrapper {
    constructor(private readonly serviceProviderValidator: ServiceProviderValidatorImpl) {
        super(serviceProviderValidator);
    }

    checkFor<T extends BaseDTO>(validationCase: string, param: BaseParam<T>): Promise<ValidationResult> {
        return new Promise(async (resolve, _) => {
            let result: ValidationResult | void;
            try {
                switch (validationCase) {
                    case ServiceProviderValidationCases.IS_MASTER: {
                        result = await this.serviceProviderValidator.isMaster(param);
                        resolve(result);
                        break;
                    }
                    case ServiceProviderValidationCases.NOT_EXCEED_MAXIMUM_SERVICE_PROVIDERS_NUMBER: {
                        result = await this.serviceProviderValidator.notexceedMaximumServiceProvidersNumber(
                            (param as unknown) as BaseParam<CreateServiceProviderDTO>
                        )

                        resolve(result);
                        break;
                    }
                    case ServiceProviderValidationCases.NOT_THE_ONLY_MASTER_IN_SERVICE_PROVIDER: {
                        result = await this.serviceProviderValidator.isNotTheOnlyMasterInServiceProvider(
                            param
                        )

                        resolve(result);
                        break;
                    }
                    case ServiceProviderValidationCases.CAN_REMOVE_USER_FROM_SERVICE_PROVIDER: {
                        result = await this.serviceProviderValidator.canRemoveUserFromServiceProvider(
                            (param as unknown) as BaseParam<RemoveUsersFromServiceProviderDTO>
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
