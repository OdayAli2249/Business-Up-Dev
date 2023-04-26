import { Module } from '@nestjs/common';
import { ProductValidatorImpl } from './inspectors/validators/product_validator_impl/product_validator_impl';
import { ProductDataSourceImpl } from './data_source/product_data_source_impl/product_data_source_impl';
import { ProductRepositoryImpl } from './repository/product_repository_impl/product_repository_impl';
import { ProductValidatorsWrapper } from './inspectors/validators/product_validators_wrapper/product_validators_wrapper';
import { ProductHandlersWrapper } from './inspectors/handlers/product_handlers_wrapper/product_handlers_wrapper';
import { Db } from 'src/data/database/db/db';

@Module({
  exports: [ProductValidatorImpl, ProductDataSourceImpl, ProductRepositoryImpl, ProductValidatorsWrapper, ProductHandlersWrapper],
  providers: [ProductValidatorImpl, ProductDataSourceImpl, ProductRepositoryImpl, ProductValidatorsWrapper, ProductHandlersWrapper, Db]
})
export class ProductsModule { }

