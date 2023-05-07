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
import { RemoveUsersFromServiceProviderDTO } from 'src/modules/service_providers/data_models/dtos/remove_users_from_service_provider_dto';

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
                    role: ['master'],
                    serviceProviderId: param.getQueryParam()['serviceProviderId']
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

    canRemoveUserFromServiceProvider(param: BaseParam<RemoveUsersFromServiceProviderDTO>): Promise<ValidationResult> {
        return new Promise(async (resolve, _) => {
            let workInServiceProvider = true;       // since work in service provider validator is not implmented, we can assume it alaways true for now
            let isMaster = await this.isMaster(param);
            if (workInServiceProvider) {
                if (param.getMetaData().userId == param.getData().user) {
                    if (isMaster.result == ProcessReult.success) {
                        let notTheOnlyMasterInServiceProvider = await this.isNotTheOnlyMasterInServiceProvider(param);
                        if (notTheOnlyMasterInServiceProvider.result == ProcessReult.success) {
                            resolve(ValidationResult.buildSuccess())
                        } else {
                            resolve(
                                ValidationResult.build(null,
                                    ServiceProviderValidationErrors.THE_ONLY_MASTER_IN_SERVICE_PROVIDER,
                                    ProcessReult.failure,
                                    'service provider', 'delete', {}))
                        }
                    } else {
                        resolve(ValidationResult.buildSuccess())
                    }
                } else {
                    let sourceUserRole = await UserServiceProviderRole.findOne({
                        where: {
                            userId: param.getMetaData().userId,
                            serviceProviderId: param.getQueryParam()['serviceProviderId'],
                        }
                    })
                    let targetUserRole = await UserServiceProviderRole.findOne({
                        where: {
                            userId: param.getData().user,
                            serviceProviderId: param.getQueryParam()['serviceProviderId'],
                        }
                    })

                    let userRoleRank: Map<string, number> = new Map([
                        ['master', 3],
                        ['sub-master', 2],
                        ['blank', 1]
                    ]);

                    if (userRoleRank[sourceUserRole.role] > userRoleRank[targetUserRole.role]) {
                        resolve(ValidationResult.buildSuccess())
                    } else {
                        resolve(
                            ValidationResult.build(null,
                                ServiceProviderValidationErrors.CAN_NOT_REMOVE_USER_FROM_SERVICE_PROVIDER,
                                ProcessReult.failure,
                                'service provider', 'delete', {}))
                    }
                }

            } else {
                resolve(
                    ValidationResult.build(null,
                        ServiceProviderValidationErrors.USER_DO_NOT_WORK_IN_SERVICE_PROVIDER,
                        ProcessReult.failure,
                        'service provider', 'delete', {}))
            }

        });
    }

}
