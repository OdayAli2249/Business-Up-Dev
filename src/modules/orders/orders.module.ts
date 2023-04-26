import { Module } from '@nestjs/common';
import { OrderController } from './controllers/order/order.controller';
import { OrderService } from './services/order/order.service';
import { OrderValidatorImpl } from './inspectors/validators/order_validator_impl/order_validator_impl';
import { OrderDataSourceImpl } from './data_source/order_data_source_impl/order_data_source_impl';
import { OrderRepositoryImpl } from './repository/order_repository_impl/order_repository_impl';
import { OrderValidatorsWrapper } from './inspectors/validators/order_validators_wrapper/order_validators_wrapper';
import { OrderHandlersWrapper } from './inspectors/handlers/order_handlers_wrapper/order_handlers_wrapper';
import { CoreModule } from '../core/core.module';
import { Db } from 'src/data/database/db/db';

@Module({
  imports: [CoreModule],
  controllers: [OrderController],
  providers: [OrderService, OrderValidatorImpl, OrderDataSourceImpl, OrderRepositoryImpl, OrderValidatorsWrapper, OrderHandlersWrapper,Db]
})
export class OrdersModule {}
