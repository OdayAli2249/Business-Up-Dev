import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';
import { AddNewUsersToBranchDTO } from '../../data_models/dtos/add_new_users_to_branch_dto';
import { BranchesWithUsersDTO } from '../../data_models/dtos/branches_with_users_dto';
import { BaseUpdateResponse } from 'src/modules/core/data_models/responses/base_update_response';
import { BaseDeleteResponse } from 'src/modules/core/data_models/responses/base_delete_response';
import { BaseCreateResponse } from 'src/modules/core/data_models/responses/base_create_response';
import { BaseReadResponse } from 'src/modules/core/data_models/responses/base_read_response';
import { BranchEntity } from '../../data_models/entities/branch_entity';
import { UserEntity } from 'src/modules/users/data_models/entities/user_entity';
import { BranchService } from '../../services/branch/branch.service';
import { Failure } from 'src/modules/core/errors/failure';

@Controller('branch')
export class BranchController {

    constructor(private readonly branchService: BranchService) { }

    @Get('get-branches/service-provider/:serviceProviderId')
    getBranches(@Param('serviceProviderId') serviceProviderId: number, // this may should be string
        @Query('withUsers') withUsers
    ): Promise<BaseReadResponse<BranchEntity> | Failure> {
        return new Promise(async (resolve, _) => {
            resolve(await this.branchService.getBranches(serviceProviderId as number, withUsers as boolean));
        });
    }

    @Get('get-branch-users/branch/:branchId')
    getBrancheUsers(@Param('branchId') branchId: number): Promise<BaseReadResponse<UserEntity> | Failure> {
        return new Promise(async (resolve, _) => {
            resolve(await this.branchService.getBrancheUsers(branchId));
        });
    }

    @Post('add-new-users-to-branch/:branchId')
    addNewUsersToBranch(@Body() createCustomerDto: AddNewUsersToBranchDTO,
        @Param('branchId') branchId: number): Promise<BaseCreateResponse | Failure> {
        return new Promise(async (resolve, _) => {
            resolve(await this.branchService.addNewUsersToBranch(createCustomerDto,
                branchId as number));
        });
    }

    @Put('add-existred-users-to-branch')
    addExistedUsersToBranch(@Body() createCustomerDto: BranchesWithUsersDTO)
        : Promise<BaseCreateResponse | Failure> {
        return new Promise(async (resolve, _) => {
            resolve(await this.branchService.addExistedUsersToBranch(createCustomerDto));
        });
    }

    @Delete('remove-existed-users-from-branch')
    removeExistedUsersFromBranch(@Body() createCustomerDto: BranchesWithUsersDTO)
        : Promise<BaseDeleteResponse | Failure> {
        return new Promise(async (resolve, _) => {
            resolve(await this.branchService.removeExistedUsersFromBranch(createCustomerDto));
        });
    }

    @Put('transfer-existed-users-to-branch')
    transferExistedUsersToBranch(@Body() createCustomerDto: BranchesWithUsersDTO)
        : Promise<BaseUpdateResponse | Failure> {
        return new Promise(async (resolve, _) => {
            resolve(await this.branchService.transferExistedUsersToBranch(createCustomerDto));
        });
    }
}
