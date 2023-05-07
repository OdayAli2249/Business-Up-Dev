import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { PermissionService } from '../../services/permission/permission.service';
import { BaseCreateResponse } from 'src/modules/core/data_models/responses/base_create_response';
import { Failure } from 'src/modules/core/errors/failure';
import { BaseUpdateResponse } from 'src/modules/core/data_models/responses/base_update_response';
import { BaseDeleteResponse } from 'src/modules/core/data_models/responses/base_delete_response';
import { BaseReadResponse } from 'src/modules/core/data_models/responses/base_read_response';
import { PermissionGroupEntity } from '../../data_models/entities/permission_group_entity';
import { CreatePermissionGroupDTO } from '../../data_models/dtos/create_permission_group_dto';
import { UpdatePermissionGroupDTO } from '../../data_models/dtos/update_permission_group_dto';

@Controller('permission')
export class PermissionController {

    constructor(
        private readonly permissionService: PermissionService) { }

    @Post('create/:branchId')
    createPermissionGroup(@Body() createPermissionGroupDTO: CreatePermissionGroupDTO,
        @Param('branchId') branchId)
        : Promise<BaseCreateResponse | Failure> {
        return new Promise(async (resolve, _) => {
            resolve(await this.permissionService.createPermissionGroup(createPermissionGroupDTO, branchId as number));
        });
    }

    @Put('update/:permissionGroupId')
    updatePermissionGroup(@Body() updatePermissionGroupDTO: UpdatePermissionGroupDTO,
        @Param('permissionGroupId') permissionGroupId)
        : Promise<BaseUpdateResponse | Failure> {
        return new Promise(async (resolve, _) => {
            resolve(await this.permissionService.updatePermissionGroup(updatePermissionGroupDTO, permissionGroupId as number));
        });
    }

    @Delete('delete/:permissionGroupId')
    deletePermissionGroup(@Param('permissionGroupId') permissionGroupId)
        : Promise<BaseDeleteResponse | Failure> {
        return new Promise(async (resolve, _) => {
            resolve(await this.permissionService.deletePermissionGroup(permissionGroupId as number));
        });
    }

    @Get('get/:branchId')
    getPermissionGroups(@Param('branchId') branchId: number): Promise<BaseReadResponse<PermissionGroupEntity> | Failure> {
        return new Promise(async (resolve, _) => {
            resolve(await this.permissionService.getPermissionGroups(branchId as number));
        });
    }

}
