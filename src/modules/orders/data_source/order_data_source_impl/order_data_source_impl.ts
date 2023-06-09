import { Injectable } from '@nestjs/common';
import { OrderDataSource } from '../order_data_source';
import { Db } from 'src/data/database/db/db';
import { OrderValidatorsWrapper } from '../../inspectors/validators/order_validators_wrapper/order_validators_wrapper';
import { CoreDataSourceImpl } from 'src/modules/core/data_source/core_data_source_impl/core_data_source_impl';
import { BaseCreateResponse } from 'src/modules/core/data_models/responses/base_create_response';
import { BaseDeleteResponse } from 'src/modules/core/data_models/responses/base_delete_response';
import { BaseReadResponse } from 'src/modules/core/data_models/responses/base_read_response';
import { BaseUpdateResponse } from 'src/modules/core/data_models/responses/base_update_response';
import { CreateOrderDTO } from '../../data_models/dtos/create_order_dto';
import { UpdateOrderDTO } from '../../data_models/dtos/update_order_dto';
import { OrderEntity } from '../../data_models/entities/order_entity';
import { OrderItemEntity } from '../../data_models/entities/order_item_entity';
import { BaseParam } from 'src/modules/core/data_models/params/base_param';
import { CUDResponseObjects } from 'src/modules/core/data_models/enums/cud_response_objects';
import { OrderValidationCases } from '../../helpers/constants';
import { Order } from 'src/data/database/models/order';
import { OrderItem } from 'src/data/database/models/order_item';

@Injectable()
export class OrderDataSourceImpl extends CoreDataSourceImpl implements OrderDataSource {
    constructor(private readonly database: Db, private readonly orderValidatorsWrapper: OrderValidatorsWrapper) {
        super()
    }
    createOrder(param: BaseParam<CreateOrderDTO>): Promise<BaseCreateResponse> {
        return this.orderValidatorsWrapper.validate<BaseCreateResponse, CreateOrderDTO>(param, () => {
            return new Promise<BaseCreateResponse>(async (resolve, reject) => {
                try {
                    let createOrderData = param.getData();
                    createOrderData.order.userId = param.getMetaData().userId;
                    let order = await Order.create({
                        name: createOrderData.order.name,
                        userId: createOrderData.order.userId
                    });
                    var data = [];
                    if (createOrderData.services && createOrderData.services.length != 0) {
                        for (var i = 0; i < createOrderData.services.length; i++) {
                            data.push({
                                name: 'arrbit',
                                orderId: order.id,
                                serviceId: createOrderData.services[i]
                            });
                        }
                    } else if (createOrderData.products && createOrderData.products.length != 0) {
                        for (var i = 0; i < createOrderData.products.length; i++) {
                            data.push({
                                name: 'arrbit',
                                orderId: order.id,
                                productId: createOrderData.products[i]
                            });
                        }
                    }
                    if (data.length != 0)
                        await OrderItem.bulkCreate(data);
                    resolve(BaseCreateResponse.build(order.id, [CUDResponseObjects.order]));
                } catch (err) {
                    reject(err)
                }
            });

        },
            [
                OrderValidationCases.ORDER_ITEMS_FROM_THE_SAME_BRANCH,       // not implemented
                OrderValidationCases.NO_ORDER_CREATION_BLOCK,
            ])
    }
    updateOrder(param: BaseParam<UpdateOrderDTO>): Promise<BaseUpdateResponse> {
        return this.orderValidatorsWrapper.validate<BaseUpdateResponse, UpdateOrderDTO>(param, () => {
            return new Promise<BaseUpdateResponse>(async (resolve, reject) => {
                try {
                    let updateOrderData = param.getData();
                    let updateOrderPathParam = param.getPathParam();
                    if (updateOrderData.order)
                        // problem when cloud front-end put id ...
                        // TO DO optional: in this type of queries we need to use transactions
                        await Order.update({ name: updateOrderData.order.name }, {
                            where: {
                                id: updateOrderPathParam['orderId']
                            }
                        })

                    var orderItems = await OrderItem.findAll({
                        where: {
                            orderId: updateOrderPathParam['orderId']
                        }
                    });

                    var data = [];

                    if (updateOrderData.services &&
                        updateOrderData.services.length != null &&
                        orderItems[0].serviceId) {
                        await OrderItem.destroy({ where: { orderId: updateOrderPathParam['orderId'] } });
                        for (var i = 0; i < updateOrderData.services.length; i++) {
                            data.push({
                                name: 'arrbit',
                                orderId: updateOrderPathParam['orderId'],
                                serviceId: updateOrderData.services[i]
                            });
                        }
                    } else if (updateOrderData.products &&
                        updateOrderData.products.length != null &&
                        orderItems[0].productId) {
                        await OrderItem.destroy({ where: { orderId: updateOrderPathParam['orderId'] } });
                        for (var i = 0; i < updateOrderData.products.length; i++) {
                            data.push({
                                name: 'arrbit',
                                orderId: updateOrderPathParam['orderId'],
                                productId: updateOrderData.products[i]
                            });
                        }
                    }
                    if (data.length != 0)
                        await OrderItem.bulkCreate(data);
                    resolve(BaseUpdateResponse.build(updateOrderPathParam['orderId'], [CUDResponseObjects.order]));
                } catch (err) {
                    console.log(err)
                    reject(err)
                }
            });

        },
            [
                OrderValidationCases.ORDER_ITEMS_TYPE_RESERVED,
                // not implemented, means in update, if you switch to items of type products from services or vice versa,
                // you will get an error
                OrderValidationCases.ORDER_ITEMS_FROM_THE_SAME_BRANCH,       // not implemented
                OrderValidationCases.CAN_UPDATE_ORDER,                       // not implemented
            ])
    }
    deleteOrder(param: BaseParam<any>): Promise<BaseDeleteResponse> {
        return this.orderValidatorsWrapper.validate<BaseDeleteResponse, any>(param, () => {
            return new Promise<BaseDeleteResponse>(async (resolve, reject) => {
                try {
                    let deleteOrderPathParam = param.getPathParam();
                    await Order.destroy({
                        where: {
                            id: deleteOrderPathParam['orderId']
                        }
                    })
                    // no need for deleting order items since delete cascade of orders will handle it.
                    resolve(BaseDeleteResponse.build(deleteOrderPathParam['orderId'], [CUDResponseObjects.order]));
                } catch (err) {
                    reject(err)
                }
            });

        },
            [
                OrderValidationCases.CAN_DELETE_ORDER,                 // not implemented
            ])
    }
    getOrders(param: BaseParam<any>): Promise<BaseReadResponse<OrderEntity>> {
        return this.orderValidatorsWrapper.validate<BaseReadResponse<OrderEntity>, any>(param, () => {
            return new Promise<BaseReadResponse<OrderEntity>>(async (resolve, reject) => {
                try {
                    let orders = await Order.findAll({ where: { userId: param.getMetaData().userId } })
                    resolve(BaseReadResponse.build(await OrderEntity.buildListFromModel(orders, [])));
                } catch (err) {
                    reject(err)
                }
            });

        },
            [
                OrderValidationCases.NO_ORDER_DISPLAY_BLOCK,
            ])
    }
    getOrderItems(param: BaseParam<any>): Promise<BaseReadResponse<OrderItemEntity>> {
        return this.orderValidatorsWrapper.validate<BaseReadResponse<OrderItemEntity>, any>(param, () => {
            return new Promise<BaseReadResponse<OrderItemEntity>>(async (resolve, reject) => {
                try {
                    let orderItems = await OrderItem.findAll({ where: { orderId: param.getPathParam()['orderId'] } })
                    resolve(BaseReadResponse.build(await OrderItemEntity.buildListFromModel(orderItems, [])));
                } catch (err) {
                    reject(err)
                }
            });

        },
            [])
    }
}
