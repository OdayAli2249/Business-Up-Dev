import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';
import { SubscribtionService } from '../../services/subscribtion/subscribtion.service';
import { BaseCreateResponse } from 'src/modules/core/data_models/responses/base_create_response';
import { Failure } from 'src/modules/core/errors/failure';
import { BaseDeleteResponse } from 'src/modules/core/data_models/responses/base_delete_response';
import { BaseReadResponse } from 'src/modules/core/data_models/responses/base_read_response';
import { SubscribtionEntity } from '../../data_models/entities/subscribtion_entity';
import { BaseUpdateResponse } from 'src/modules/core/data_models/responses/base_update_response';
import { CreateSubscribtionDTO } from '../../data_models/dtos/create_subscribtion_dto';
import { UpdateSubscribtionDTO } from '../../data_models/dtos/update_subscribtion_dto';

@Controller('subscribtion')
export class SubscribtionController {

    constructor(private readonly subscribtionService: SubscribtionService) { }

    @Post('create/:serviceProviderId')
    createSubscribtion(@Body() createSubscribtionDTO: CreateSubscribtionDTO,
        @Param('serviceProviderId') serviceProviderId)
        : Promise<BaseCreateResponse | Failure> {
        return new Promise(async (resolve, _) => {
            resolve(await this.subscribtionService.createSubscribtion(createSubscribtionDTO, serviceProviderId as number));
        });
    }

    @Put('update/:subscribtionId')
    updateSubscribtion(
        @Body() updateSubscribtionDTO: UpdateSubscribtionDTO,
        @Param('subscribtionId') subscribtionId: number
    )
        : Promise<BaseUpdateResponse | Failure> {
        return new Promise(async (resolve, _) => {
            resolve(await this.subscribtionService.updateSubscribtion(updateSubscribtionDTO, subscribtionId as number));
        });
    }

    @Delete('cancel/:subscribtionId')
    deleteSubscribtion(@Param('subscribtionId') subscribtionId: number)
        : Promise<BaseDeleteResponse | Failure> {
        return new Promise(async (resolve, _) => {
            resolve(await this.subscribtionService.deleteSubscribtion(subscribtionId as number));
        });
    }

    @Get('get')
    getSubscribtions(
        @Query('userId') userId,
        @Query('serviceProviderId') serviceProviderId
    ): Promise<BaseReadResponse<SubscribtionEntity> | Failure> {
        return new Promise(async (resolve, _) => {
            resolve(await this.subscribtionService.getSubscribtions(userId as number, serviceProviderId as number));
        });
    }

}
