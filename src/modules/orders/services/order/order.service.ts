import { Injectable } from '@nestjs/common';
import { OrderRepositoryImpl } from '../../repository/order_repository_impl/order_repository_impl';
import { BaseCreateResponse } from 'src/modules/core/data_models/responses/base_create_response';
import { FailureOr } from 'src/modules/core/data_models/failure_or';
import { BaseParam } from 'src/modules/core/data_models/params/base_param';
import { ProcessReult } from 'src/modules/core/data_models/enums/process_result';
import { Failure } from 'src/modules/core/errors/failure';
import { BaseUpdateResponse } from 'src/modules/core/data_models/responses/base_update_response';
import { BaseDeleteResponse } from 'src/modules/core/data_models/responses/base_delete_response';
import { OrderEntity } from '../../data_models/entities/order_entity';
import { BaseReadResponse } from 'src/modules/core/data_models/responses/base_read_response';
import { OrderItemEntity } from '../../data_models/entities/order_item_entity';
import { CreateOrderDTO } from '../../data_models/dtos/create_order_dto';
import { UpdateOrderDTO } from '../../data_models/dtos/update_order_dto';

@Injectable()
export class OrderService {

    constructor(
        private readonly orderRepository: OrderRepositoryImpl) { }

    createOrder(createOrderDTO: CreateOrderDTO): Promise<BaseCreateResponse | Failure> {
        let param: BaseParam<any> = BaseParam.build({
            pathParam: null,
            queryParam: null,
            data: createOrderDTO,
            metaData: null
        });
        return new Promise(async (resolve, _) => {
            let request: FailureOr<BaseCreateResponse>;
            request = await this.orderRepository.createOrder(param);
            resolve(request.getReult() == ProcessReult.success ? request.getResponse() : request.getFailure())
        });
    }

    updateOrder(updateOrderDTO: UpdateOrderDTO, orderId: number): Promise<BaseUpdateResponse | Failure> {
        let pathParam = new Map<string, any>();
        pathParam['orderId'] = orderId;
        let param: BaseParam<any> = BaseParam.build({
            pathParam: pathParam,
            queryParam: null,
            data: updateOrderDTO,
            metaData: null
        });
        return new Promise(async (resolve, _) => {
            let request: FailureOr<BaseUpdateResponse>;
            request = await this.orderRepository.updateOrder(param);
            resolve(request.getReult() == ProcessReult.success ? request.getResponse() : request.getFailure())
        });
    }

    deleteOrder(orderId: number): Promise<BaseDeleteResponse | Failure> {
        let pathParam = new Map<string, any>();
        pathParam['orderId'] = orderId;
        let param: BaseParam<any> = BaseParam.build({
            pathParam: pathParam,
            queryParam: null,
            data: null,
            metaData: null
        });
        return new Promise(async (resolve, _) => {
            let request: FailureOr<BaseDeleteResponse>;
            request = await this.orderRepository.deleteOrder(param);
            resolve(request.getReult() == ProcessReult.success ? request.getResponse() : request.getFailure())
        });
    }

    getOrders()
        : Promise<BaseReadResponse<OrderEntity> | Failure> {
        let pathParam = new Map<string, any>();
        let param: BaseParam<any> = BaseParam.build({
            pathParam: pathParam,
            queryParam: null,
            data: null,
            metaData: null
        });
        return new Promise(async (resolve, _) => {
            let request: FailureOr<BaseReadResponse<OrderEntity>>;
            request = await this.orderRepository.getOrders(param);
            resolve(request.getReult() == ProcessReult.success ? request.getResponse() : request.getFailure())
        });
    }

    getOrderItems(orderId: number)
        : Promise<BaseReadResponse<OrderItemEntity> | Failure> {
        let pathParam = new Map<string, any>();
        pathParam['orderId'] = orderId;
        let param: BaseParam<any> = BaseParam.build({
            pathParam: pathParam,
            queryParam: null,
            data: null,
            metaData: null
        });
        return new Promise(async (resolve, _) => {
            let request: FailureOr<BaseReadResponse<OrderItemEntity>>;
            request = await this.orderRepository.getOrderItems(param);
            resolve(request.getReult() == ProcessReult.success ? request.getResponse() : request.getFailure())
        });
    }
}
