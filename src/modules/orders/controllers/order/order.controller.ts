import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { OrderService } from '../../services/order/order.service';
import { BaseCreateResponse } from 'src/modules/core/data_models/responses/base_create_response';
import { Failure } from 'src/modules/core/errors/failure';
import { BaseUpdateResponse } from 'src/modules/core/data_models/responses/base_update_response';
import { BaseDeleteResponse } from 'src/modules/core/data_models/responses/base_delete_response';
import { BaseReadResponse } from 'src/modules/core/data_models/responses/base_read_response';
import { OrderItemEntity } from '../../data_models/entities/order_item_entity';
import { OrderEntity } from '../../data_models/entities/order_entity';
import { CreateOrderDTO } from '../../data_models/dtos/create_order_dto';
import { UpdateOrderDTO } from '../../data_models/dtos/update_order_dto';

@Controller('order')
export class OrderController {

    constructor(
        private readonly orderService: OrderService) { }

    @Post('create')
    createOrder(@Body() createOrderDTO: CreateOrderDTO)
        : Promise<BaseCreateResponse | Failure> {
        return new Promise(async (resolve, _) => {
            resolve(await this.orderService.createOrder(createOrderDTO));
        });
    }

    @Put('update/:orderId')
    updateOrder(@Body() updateOrderDTO: UpdateOrderDTO,
        @Param('orderId') orderId: number)
        : Promise<BaseUpdateResponse | Failure> {
        return new Promise(async (resolve, _) => {
            resolve(await this.orderService.updateOrder(updateOrderDTO, orderId as number));
        });
    }

    @Delete('cancel/:orderId')
    deleteOrder(@Param('orderId') orderId: number)
        : Promise<BaseDeleteResponse | Failure> {
        return new Promise(async (resolve, _) => {
            resolve(await this.orderService.deleteOrder(orderId as number));
        });
    }

    @Get('get')
    getOrders(): Promise<BaseReadResponse<OrderEntity> | Failure> {
        return new Promise(async (resolve, _) => {
            resolve(await this.orderService.getOrders());
        });
    }

    @Get('get-items/:orderId')
    getOrderItems(@Param('orderId') orderId: number): Promise<BaseReadResponse<OrderItemEntity> | Failure> {
        return new Promise(async (resolve, _) => {
            resolve(await this.orderService.getOrderItems(orderId as number));
        });
    }

}
