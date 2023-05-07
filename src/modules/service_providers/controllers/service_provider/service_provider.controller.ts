import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';
import { ServiceProviderService } from '../../services/service_provider/service_provider.service';
import { BaseCreateResponse } from 'src/modules/core/data_models/responses/base_create_response';
import { Failure } from 'src/modules/core/errors/failure';
import { BaseReadResponse } from 'src/modules/core/data_models/responses/base_read_response';
import { ServiceProviderEntity } from '../../data_models/entities/service_provider_entity';
import { BaseUpdateResponse } from 'src/modules/core/data_models/responses/base_update_response';
import { BaseDeleteResponse } from 'src/modules/core/data_models/responses/base_delete_response';
import { CreateServiceProviderDTO } from '../../data_models/dtos/create_service_provider_dto';
import { RemoveUsersFromServiceProviderDTO } from '../../data_models/dtos/remove_users_from_service_provider_dto';

@Controller('service-provider')
export class ServiceProviderController {

    constructor(
        private readonly serviceProviderService: ServiceProviderService) { }

    @Post('create')
    createServiceProvider(@Body() createServiceProviderDTO: CreateServiceProviderDTO)
        : Promise<BaseCreateResponse | Failure> {
        return new Promise(async (resolve, _) => {
            resolve(await this.serviceProviderService.createServiceProvider(createServiceProviderDTO));
        });
    }

    @Get('get')
    getServiceProviders(): Promise<BaseReadResponse<ServiceProviderEntity> | Failure> {
        return new Promise(async (resolve, _) => {
            resolve(await this.serviceProviderService.getServiceProviders());
        });
    }

    @Get('get-user-service-providers/:userId')
    getUserServiceProviders(@Param('userId') userId): Promise<BaseReadResponse<ServiceProviderEntity> | Failure> {
        return new Promise(async (resolve, _) => {
            resolve(await this.serviceProviderService.getUserServiceProviders(userId as number));
        });
    }

    @Put('remove-sub-master')
    removeSubMasterUser(
        @Query('userId') userId,
        @Query('serviceProviderId') serviceProviderId
    )
        : Promise<BaseUpdateResponse | Failure> {
        return new Promise(async (resolve, _) => {
            resolve(await this.serviceProviderService.removeSubMasterUser(
                userId as number,
                serviceProviderId as number));
        });
    }

    @Put('add-sub-master')
    addSubMasterUser(
        @Query('userId') userId,
        @Query('serviceProviderId') serviceProviderId
    )
        : Promise<BaseUpdateResponse | Failure> {
        return new Promise(async (resolve, _) => {
            resolve(await this.serviceProviderService.addSubMasterUser(
                userId as number,
                serviceProviderId as number));
        });
    }

    @Delete('remove-user-from-service-provider')
    removeUserFromServiceProvider(@Body() removeUsersFromServiceProviderDTO: RemoveUsersFromServiceProviderDTO,
        @Query('serviceProviderId') serviceProviderId)
        : Promise<BaseDeleteResponse | Failure> {
        return new Promise(async (resolve, _) => {
            resolve(await this.serviceProviderService.removeUserFromServiceProvider(removeUsersFromServiceProviderDTO,
                serviceProviderId as number));
        });
    }
}
