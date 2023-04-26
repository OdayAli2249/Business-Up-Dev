import { Injectable } from '@nestjs/common';
import { OrderRepository } from '../order_repository';
import { OrderDataSourceImpl } from '../../data_source/order_data_source_impl/order_data_source_impl';
import { OrderHandlersWrapper } from '../../inspectors/handlers/order_handlers_wrapper/order_handlers_wrapper';
import { CoreRepositoryImpl } from 'src/modules/core/repository/core_repository_impl/core_repository_impl';
import { FailureOr } from 'src/modules/core/data_models/failure_or';
import { BaseParam } from 'src/modules/core/data_models/params/base_param';
import { BaseCreateResponse } from 'src/modules/core/data_models/responses/base_create_response';
import { BaseDeleteResponse } from 'src/modules/core/data_models/responses/base_delete_response';
import { BaseReadResponse } from 'src/modules/core/data_models/responses/base_read_response';
import { BaseUpdateResponse } from 'src/modules/core/data_models/responses/base_update_response';
import { CreateOrderDTO } from '../../data_models/dtos/create_order_dto';
import { UpdateOrderDTO } from '../../data_models/dtos/update_order_dto';
import { OrderEntity } from '../../data_models/entities/order_entity';
import { OrderItemEntity } from '../../data_models/entities/order_item_entity';

@Injectable()
export class OrderRepositoryImpl extends CoreRepositoryImpl implements OrderRepository {
    constructor(private readonly orderHandlersWrapper: OrderHandlersWrapper, private readonly orderDataSource: OrderDataSourceImpl) {
        super()
    }
    createOrder(param: BaseParam<CreateOrderDTO>): Promise<FailureOr<BaseCreateResponse>> {
        return this.orderHandlersWrapper.handle(param, () => {
            return new Promise(async (resolve, reject) => {
                let response: BaseCreateResponse;
                try {
                    response = await this.orderDataSource.createOrder(param);
                    resolve(response);
                } catch (err) {
                    reject(err);
                }
            })
        })
    }
    updateOrder(param: BaseParam<UpdateOrderDTO>): Promise<FailureOr<BaseUpdateResponse>> {
        return this.orderHandlersWrapper.handle(param, () => {
            return new Promise(async (resolve, reject) => {
                let response: BaseUpdateResponse;
                try {
                    response = await this.orderDataSource.updateOrder(param);
                    resolve(response);
                } catch (err) {
                    reject(err);
                }
            })
        })
    }
    deleteOrder(param: BaseParam<any>): Promise<FailureOr<BaseDeleteResponse>> {
        return this.orderHandlersWrapper.handle(param, () => {
            return new Promise(async (resolve, reject) => {
                let response: BaseDeleteResponse;
                try {
                    response = await this.orderDataSource.deleteOrder(param);
                    resolve(response);
                } catch (err) {
                    reject(err);
                }
            })
        })
    }
    getOrders(param: BaseParam<any>): Promise<FailureOr<BaseReadResponse<OrderEntity>>> {
        return this.orderHandlersWrapper.handle(param, () => {
            return new Promise(async (resolve, reject) => {
                let response: BaseReadResponse<OrderEntity>;
                try {
                    response = await this.orderDataSource.getOrders(param);
                    resolve(response);
                } catch (err) {
                    reject(err);
                }
            })
        })
    }
    getOrderItems(param: BaseParam<any>): Promise<FailureOr<BaseReadResponse<OrderItemEntity>>> {
        return this.orderHandlersWrapper.handle(param, () => {
            return new Promise(async (resolve, reject) => {
                let response: BaseReadResponse<OrderItemEntity>;
                try {
                    response = await this.orderDataSource.getOrderItems(param);
                    resolve(response);
                } catch (err) {
                    reject(err);
                }
            })
        })
    }
}
