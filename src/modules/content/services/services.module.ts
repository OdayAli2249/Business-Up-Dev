import { Module } from '@nestjs/common';
import { ServiceValidatorImpl } from './inspectors/validators/service_validator_impl/service_validator_impl';
import { ServiceDataSourceImpl } from './data_source/service_data_source_impl/service_data_source_impl';
import { ServiceRepositoryImpl } from './repository/service_repository_impl/service_repository_impl';
import { ServiceValidatorsWrapper } from './inspectors/validators/service_validators_wrapper/service_validators_wrapper';
import { ServiceHandlersWrapper } from './inspectors/handlers/service_handlers_wrapper/service_handlers_wrapper';
import { Db } from 'src/data/database/db/db';

@Module({
  exports: [ServiceValidatorImpl, ServiceDataSourceImpl, ServiceRepositoryImpl, ServiceValidatorsWrapper, ServiceHandlersWrapper],
  providers: [ServiceValidatorImpl, ServiceDataSourceImpl, ServiceRepositoryImpl, ServiceValidatorsWrapper, ServiceHandlersWrapper, Db]
})
export class ServicesModule { }
