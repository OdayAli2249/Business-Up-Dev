import { Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { HiringRequestService } from '../../services/hiring_request/hiring_request.service';
import { BaseCreateResponse } from 'src/modules/core/data_models/responses/base_create_response';
import { Failure } from 'src/modules/core/errors/failure';
import { BaseUpdateResponse } from 'src/modules/core/data_models/responses/base_update_response';
import { BaseDeleteResponse } from 'src/modules/core/data_models/responses/base_delete_response';
import { BaseReadResponse } from 'src/modules/core/data_models/responses/base_read_response';
import { HiringRequestEntity } from '../../data_models/entities/hiring_request_entity';

@Controller('hiring-request')
export class HiringRequestController {

    constructor(
        private readonly hiringRequestService: HiringRequestService) { }

    @Post('create/:serviceProviderId')
    createHiringRequest(@Param('serviceProviderId') serviceProviderId: number)
        : Promise<BaseCreateResponse | Failure> {
        return new Promise(async (resolve, _) => {
            resolve(await this.hiringRequestService.createHiringRequest(serviceProviderId as number));
        });
    }

    @Put('reject/:hiringRequestId')
    rejectHiringRequest(@Param('hiringRequestId') hiringRequestId: number)
        : Promise<BaseUpdateResponse | Failure> {
        return new Promise(async (resolve, _) => {
            resolve(await this.hiringRequestService.rejectHiringRequest(hiringRequestId as number));
        });
    }

    @Delete('cancel/:hiringRequestId')
    cancelHiringRequest(@Param('hiringRequestId') hiringRequestId: number)
        : Promise<BaseDeleteResponse | Failure> {
        return new Promise(async (resolve, _) => {
            resolve(await this.hiringRequestService.cancelHiringRequest(hiringRequestId as number));
        });
    }

    @Get('get')
    getUserHiringRequests(): Promise<BaseReadResponse<HiringRequestEntity> | Failure> {
        return new Promise(async (resolve, _) => {
            resolve(await this.hiringRequestService.getUserHiringRequests());
        });
    }

    @Get('get-pending/:serviceProviderId')
    getPendingServiceProvidertHiringRequest(@Param('serviceProviderId') serviceProviderId: number): Promise<BaseReadResponse<HiringRequestEntity> | Failure> {
        return new Promise(async (resolve, _) => {
            resolve(await this.hiringRequestService.getPendingServiceProvidertHiringRequest(serviceProviderId as number));
        });
    }
}
