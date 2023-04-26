import { Injectable } from '@nestjs/common';
import { ServiceProviderValidator } from '../service_provider_validator';
import { Db } from 'src/data/database/db/db';
import { CoreValidatorImpl } from 'src/modules/core/inspectors/validators/core_validator_impl/core_validator_impl';
import { ValidationResult } from 'src/modules/core/data_models/validation_result';
import { CreateServiceProviderDTO } from 'src/modules/service_providers/data_models/dtos/create_service_provider_dto';
import { BaseParam } from 'src/modules/core/data_models/params/base_param';
import { UserServiceProviderRole } from 'src/data/database/models/user_service_provider_role';
import { ServiceProviderValidationErrors } from 'src/modules/service_providers/helpers/constants';
import { ProcessReult } from 'src/modules/core/data_models/enums/process_result';
import { Branch } from 'src/data/database/models/branch';
import { UserBranch } from 'src/data/database/models/user_branch';

@Injectable()
export class ServiceProviderValidatorImpl extends CoreValidatorImpl implements ServiceProviderValidator {
    constructor(private readonly database: Db) {
        super()
    }
    isMaster(param: BaseParam<any>): Promise<ValidationResult> {
        return new Promise(async (resolve, _) => {
            let role = await UserServiceProviderRole.count({
                where: {
                    // get user id from meta data (which is id of user who is sending current request)
                    // NOT user id in query params as in data source function since this id is the id of maniplulated
                    userId: param.getMetaData().userId,
                    serviceProviderId: param.getQueryParam()['serviceProviderId'],
                    role: ['master']
                }
            })
            resolve(role != 0 ? ValidationResult.buildSuccess() :
                ValidationResult.build(null,
                    ServiceProviderValidationErrors.NOT_MASTER,
                    ProcessReult.failure,
                    'service provider', 'update', {}))
        });
    }
    isNotTheOnlyMasterInServiceProvider(param: BaseParam<any>): Promise<ValidationResult> {
        return new Promise(async (resolve, _) => {
            let role = await UserServiceProviderRole.count({
                where: {
                    role: ['master']
                }
            })
            resolve(role > 1 ? ValidationResult.buildSuccess() :
                ValidationResult.build(null,
                    ServiceProviderValidationErrors.THE_ONLY_MASTER_IN_SERVICE_PROVIDER,
                    ProcessReult.failure,
                    'service provider', 'update', {}))
        });
    }
    doesUserWorkInServiceProvider(param: BaseParam<any>): Promise<ValidationResult> {
        return new Promise(async (resolve, reject) => {
            // this validator is just for showcase LOL
            resolve(ValidationResult.buildSuccess())
        });
    }
    notexceedMaximumServiceProvidersNumber(param: BaseParam<CreateServiceProviderDTO>): Promise<ValidationResult> {
        return new Promise(async (resolve, _) => {
            // there are no restrictions on number of service provider for now, maybe will be in future 
            resolve(ValidationResult.buildSuccess())
        });
    }
}
