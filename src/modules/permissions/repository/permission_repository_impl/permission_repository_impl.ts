import { Injectable } from '@nestjs/common';
import { PermissionHandlersWrapper } from '../../inspectors/handlers/permission_handlers_wrapper/permission_handlers_wrapper';
import { PermissionDataSourceImpl } from '../../data_source/permission_data_source_impl/permission_data_source_impl';
import { CoreRepositoryImpl } from 'src/modules/core/repository/core_repository_impl/core_repository_impl';
import { PermissionRepository } from '../permission_repository';
import { FailureOr } from 'src/modules/core/data_models/failure_or';
import { BaseParam } from 'src/modules/core/data_models/params/base_param';
import { BaseCreateResponse } from 'src/modules/core/data_models/responses/base_create_response';
import { BaseDeleteResponse } from 'src/modules/core/data_models/responses/base_delete_response';
import { BaseReadResponse } from 'src/modules/core/data_models/responses/base_read_response';
import { BaseUpdateResponse } from 'src/modules/core/data_models/responses/base_update_response';
import { CreatePermissionGroupDTO } from '../../data_models/dtos/create_permission_group_dto';
import { UpdatePermissionGroupDTO } from '../../data_models/dtos/update_permission_group_dto';
import { PermissionGroupEntity } from '../../data_models/entities/permission_group_entity';

@Injectable()
export class PermissionRepositoryImpl extends CoreRepositoryImpl implements PermissionRepository {
    constructor(private readonly permissionHandlersWrapper: PermissionHandlersWrapper, private readonly permissionDataSource: PermissionDataSourceImpl) {
        super()
    }
    createPermissionGroup(param: BaseParam<CreatePermissionGroupDTO>): Promise<FailureOr<BaseCreateResponse>> {
        return this.permissionHandlersWrapper.handle(param, () => {
            return new Promise(async (resolve, reject) => {
                let response: BaseCreateResponse;
                try {
                    response = await this.permissionDataSource.createPermissionGroup(param);
                    resolve(response);
                } catch (err) {
                    reject(err);
                }
            })
        })
    }
    updatePermissionGroup(param: BaseParam<UpdatePermissionGroupDTO>): Promise<FailureOr<BaseUpdateResponse>> {
        return this.permissionHandlersWrapper.handle(param, () => {
            return new Promise(async (resolve, reject) => {
                let response: BaseUpdateResponse;
                try {
                    response = await this.permissionDataSource.updatePermissionGroup(param);
                    resolve(response);
                } catch (err) {
                    reject(err);
                }
            })
        })
    }
    deletePermissionGroup(param: BaseParam<any>): Promise<FailureOr<BaseDeleteResponse>> {
        return this.permissionHandlersWrapper.handle(param, () => {
            return new Promise(async (resolve, reject) => {
                let response: BaseDeleteResponse;
                try {
                    response = await this.permissionDataSource.deletePermissionGroup(param);
                    resolve(response);
                } catch (err) {
                    reject(err);
                }
            })
        })
    }
    getPermissionGroups(param: BaseParam<any>): Promise<FailureOr<BaseReadResponse<PermissionGroupEntity>>> {
        return this.permissionHandlersWrapper.handle(param, () => {
            return new Promise(async (resolve, reject) => {
                let response: BaseReadResponse<PermissionGroupEntity>;
                try {
                    response = await this.permissionDataSource.getPermissionGroups(param);
                    resolve(response);
                } catch (err) {
                    reject(err);
                }
            })
        })
    }
}
