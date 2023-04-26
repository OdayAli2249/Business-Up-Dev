import { Injectable } from '@nestjs/common';
import { ServiceDataSource } from '../service_data_source';
import { Db } from 'src/data/database/db/db';
import { ServiceValidatorsWrapper } from '../../inspectors/validators/service_validators_wrapper/service_validators_wrapper';
import { CoreDataSourceImpl } from 'src/modules/core/data_source/core_data_source_impl/core_data_source_impl';
import { BaseCreateResponse } from 'src/modules/core/data_models/responses/base_create_response';
import { BaseDeleteResponse } from 'src/modules/core/data_models/responses/base_delete_response';
import { BaseReadResponse } from 'src/modules/core/data_models/responses/base_read_response';
import { BaseUpdateResponse } from 'src/modules/core/data_models/responses/base_update_response';
import { CreateServiceDTO } from '../../data_models/dtos/create_service_dto';
import { UpdateServiceDTO } from '../../data_models/dtos/update_service_dto';
import { ServiceEntity } from '../../data_models/entities/service_entity';
import { BaseParam } from 'src/modules/core/data_models/params/base_param';
import { CUDResponseObjects } from 'src/modules/core/data_models/enums/cud_response_objects';
import { ServiceValidationCases } from '../../helpers/constants';
import { Service } from 'src/data/database/models/service';
import { PermissionGroup } from 'src/data/database/models/permission_group';
import { Permission } from 'src/data/database/models/permission';
import { Op } from 'sequelize';

@Injectable()
export class ServiceDataSourceImpl extends CoreDataSourceImpl implements ServiceDataSource {
    constructor(private readonly database: Db, private readonly serviceValidatorsWrapper: ServiceValidatorsWrapper) {
        super()
    }
    createService(param: BaseParam<CreateServiceDTO>): Promise<BaseCreateResponse> {
        return this.serviceValidatorsWrapper.validate<BaseCreateResponse, CreateServiceDTO>(param, () => {
            return new Promise<BaseCreateResponse>(async (resolve, reject) => {
                try {
                    let createServiceData = param.getData();
                    createServiceData.service.branchId = param.getPathParam()['branchId'];
                    let service = await Service.create(createServiceData.service);
                    resolve(BaseCreateResponse.build(service.id, CUDResponseObjects.service));
                } catch (err) {
                    reject(err)
                }
            });

        },
            [
                ServiceValidationCases.NO_TEMPORARY_SERVICE_CREATE_DENY,
            ])
    }
    updateService(param: BaseParam<UpdateServiceDTO>): Promise<BaseUpdateResponse> {
        return this.serviceValidatorsWrapper.validate<BaseUpdateResponse, UpdateServiceDTO>(param, () => {
            return new Promise<BaseUpdateResponse>(async (resolve, reject) => {
                try {
                    await Service.update(param.getData().service, {
                        where: {
                            id: param.getPathParam()['serviceId']
                        }
                    })
                    resolve(BaseUpdateResponse.build(0, CUDResponseObjects.service));
                } catch (err) {
                    reject(err)
                }
            });

        },
            [
                ServiceValidationCases.NO_TEMPORARY_SERVICE_UPDATE_DENY,
            ])
    }
    deleteService(param: BaseParam<any>): Promise<BaseDeleteResponse> {
        return this.serviceValidatorsWrapper.validate<BaseDeleteResponse, any>(param, () => {
            return new Promise<BaseDeleteResponse>(async (resolve, reject) => {
                try {
                    let service = await Service.destroy({
                        where: {
                            id: param.getPathParam()['serviceId']
                        }
                    })
                    resolve(BaseDeleteResponse.build(service, CUDResponseObjects.comment));
                } catch (err) {
                    reject(err)
                }
            });

        },
            [
                ServiceValidationCases.NO_TEMPORARY_SERVICE_DELETE_DENY,
            ])
    }
    getServices(param: BaseParam<any>): Promise<BaseReadResponse<ServiceEntity>> {
        return this.serviceValidatorsWrapper.validate<BaseReadResponse<ServiceEntity>, any>(param, () => {
            return new Promise<BaseReadResponse<ServiceEntity>>(async (resolve, reject) => {
                try {
                    let services = await Service.findAll({
                        where: {
                            branchId: param.getPathParam()['branchId']
                        }
                    })
                    resolve(BaseReadResponse.build(await ServiceEntity.buildListFromModel(services, [])));
                } catch (err) {
                    reject(err)
                }
            });

        },
            [
                ServiceValidationCases.CAN_DISPLAY_SERVICES,
            ])
    }
    getServicesWithPermissions(param: BaseParam<any>): Promise<BaseReadResponse<ServiceEntity>> {
        return this.serviceValidatorsWrapper.validate<BaseReadResponse<ServiceEntity>, any>(param, () => {
            return new Promise<BaseReadResponse<ServiceEntity>>(async (resolve, reject) => {
                try {
                    let getServicesPathParam = param.getPathParam();
                    let services = await Service.findAll({
                        where: {
                            branchId: getServicesPathParam['branchId']
                        }
                    });
                    let branchGroups = await PermissionGroup.findAll({ where: { branchId: getServicesPathParam['branchId'] } })
                    let servicePermissions = await Permission.findAll(
                        {
                            where:
                            {
                                serviceId: { [Op.not]: null },
                                userId: getServicesPathParam['userId'],
                                permissionGroupId: branchGroups.map((permissionGroup) => permissionGroup.id)
                            }
                        })
                    let serviceEntities = await ServiceEntity.buildListFromModel(services, [])
                    for (var i = 0; i < serviceEntities.length; i++) {
                        let actionList = [];
                        for (var j = 0; j < servicePermissions.length; j++) {
                            if (servicePermissions[j].serviceId == serviceEntities[i].id) {
                                actionList.push(servicePermissions[j].actions)
                            }
                        }
                        serviceEntities[i].permissions = actionList;
                    }
                    resolve(BaseReadResponse.build(serviceEntities));
                } catch (err) {
                    reject(err)
                }
            });
        },
            [
                ServiceValidationCases.CAN_DISPLAY_SERVICES,
            ])
    }
}
