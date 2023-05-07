import { Injectable } from '@nestjs/common';
import { PermissionRepositoryImpl } from '../../repository/permission_repository_impl/permission_repository_impl';
import { BaseCreateResponse } from 'src/modules/core/data_models/responses/base_create_response';
import { Failure } from 'src/modules/core/errors/failure';
import { BaseParam } from 'src/modules/core/data_models/params/base_param';
import { FailureOr } from 'src/modules/core/data_models/failure_or';
import { ProcessReult } from 'src/modules/core/data_models/enums/process_result';
import { BaseUpdateResponse } from 'src/modules/core/data_models/responses/base_update_response';
import { BaseDeleteResponse } from 'src/modules/core/data_models/responses/base_delete_response';
import { BaseReadResponse } from 'src/modules/core/data_models/responses/base_read_response';
import { PermissionGroupEntity } from '../../data_models/entities/permission_group_entity';
import { CreatePermissionGroupDTO } from '../../data_models/dtos/create_permission_group_dto';
import { UpdatePermissionGroupDTO } from '../../data_models/dtos/update_permission_group_dto';

@Injectable()
export class PermissionService {

    constructor(
        private readonly permissionRepository: PermissionRepositoryImpl) { }

    createPermissionGroup(createPermissionGroupDTO: CreatePermissionGroupDTO,
        branchId: number): Promise<BaseCreateResponse | Failure> {
        let pathParam = new Map<string, any>();
        pathParam['branchId'] = branchId;
        let param: BaseParam<any> = BaseParam.build({
            pathParam: pathParam,
            queryParam: null,
            data: createPermissionGroupDTO,
            // metaData: null,
            obj: {}
        });
        return new Promise(async (resolve, _) => {
            let request: FailureOr<BaseCreateResponse>;
            request = await this.permissionRepository.createPermissionGroup(param);
            resolve(request.getReult() == ProcessReult.success ? request.getResponse() : request.getFailure())
        });
    }

    updatePermissionGroup(updatePermissionGroupDTO: UpdatePermissionGroupDTO,
        permissionGroupId: number): Promise<BaseUpdateResponse | Failure> {
        let pathParam = new Map<string, any>();
        pathParam['permissionGroupId'] = permissionGroupId;
        let param: BaseParam<any> = BaseParam.build({
            pathParam: pathParam,
            queryParam: null,
            data: updatePermissionGroupDTO,
            // metaData: null,
            obj: {}
        });
        return new Promise(async (resolve, _) => {
            let request: FailureOr<BaseUpdateResponse>;
            request = await this.permissionRepository.updatePermissionGroup(param);
            resolve(request.getReult() == ProcessReult.success ? request.getResponse() : request.getFailure())
        });
    }

    deletePermissionGroup(permissionGroupId: number): Promise<BaseDeleteResponse | Failure> {
        let pathParam = new Map<string, any>();
        pathParam['permissionGroupId'] = permissionGroupId;
        let param: BaseParam<any> = BaseParam.build({
            pathParam: pathParam,
            queryParam: null,
            data: null,
            // metaData: null,
            obj: {}
        });
        return new Promise(async (resolve, _) => {
            let request: FailureOr<BaseDeleteResponse>;
            request = await this.permissionRepository.deletePermissionGroup(param);
            resolve(request.getReult() == ProcessReult.success ? request.getResponse() : request.getFailure())
        });
    }

    getPermissionGroups(branchId: number)
        : Promise<BaseReadResponse<PermissionGroupEntity> | Failure> {
        let pathParam = new Map<string, any>();
        pathParam['branchId'] = branchId;
        let param: BaseParam<any> = BaseParam.build({
            pathParam: pathParam,
            queryParam: null,
            data: null,
            // metaData: null,
            obj: {}
        });
        return new Promise(async (resolve, _) => {
            let request: FailureOr<BaseReadResponse<PermissionGroupEntity>>;
            request = await this.permissionRepository.getPermissionGroups(param);
            resolve(request.getReult() == ProcessReult.success ? request.getResponse() : request.getFailure())
        });
    }

}
