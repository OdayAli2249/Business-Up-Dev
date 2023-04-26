import { Module } from '@nestjs/common';
import { ServiceProviderController } from './controllers/service_provider/service_provider.controller';
import { ServiceProviderService } from './services/service_provider/service_provider.service';
import { ServiceProviderValidatorImpl } from './inspectors/validators/service_provider_validator_impl/service_provider_validator_impl';
import { ServiceProviderDataSourceImpl } from './data_source/service_provider_data_source_impl/service_provider_data_source_impl';
import { ServiceProviderRepositoryImpl } from './repository/service_provider_repository_impl/service_provider_repository_impl';
import { ServiceProviderValidatorsWrapper } from './inspectors/validators/service_provider_validators_wrapper/service_provider_validators_wrapper';
import { ServiceProviderHandlersWrapper } from './inspectors/handlers/service_provider_handlers_wrapper/service_provider_handlers_wrapper';
import { CoreModule } from '../core/core.module';
import { Db } from 'src/data/database/db/db';

@Module({
  imports: [CoreModule],
  controllers: [ServiceProviderController],
  providers: [ServiceProviderService, ServiceProviderValidatorImpl, ServiceProviderDataSourceImpl, ServiceProviderRepositoryImpl, ServiceProviderValidatorsWrapper, ServiceProviderHandlersWrapper,Db]
})
export class ServiceProvidersModule { }
