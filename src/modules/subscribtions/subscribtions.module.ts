import { Module } from '@nestjs/common';
import { SubscribtionController } from './controllers/subscribtion/subscribtion.controller';
import { SubscribtionService } from './services/subscribtion/subscribtion.service';
import { SubscribtionValidatorImpl } from './inspectors/validators/subscribtion_validator_impl/subscribtion_validator_impl';
import { SubscribtionDataSourceImpl } from './data_source/subscribtion_data_source_impl/subscribtion_data_source_impl';
import { SubscribtionRepositoryImpl } from './repository/subscribtion_repository_impl/subscribtion_repository_impl';
import { SubscribtionValidatorsWrapper } from './inspectors/validators/subscribtion_validators_wrapper/subscribtion_validators_wrapper';
import { SubscribtionHandlersWrapper } from './inspectors/handlers/subscribtion_handlers_wrapper/subscribtion_handlers_wrapper';
import { CoreModule } from '../core/core.module';
import { Db } from 'src/data/database/db/db';

@Module({
  imports: [CoreModule],
  controllers: [SubscribtionController],
  providers: [SubscribtionService, SubscribtionValidatorImpl, SubscribtionDataSourceImpl, SubscribtionRepositoryImpl, SubscribtionValidatorsWrapper, SubscribtionHandlersWrapper,Db]
})
export class SubscribtionsModule { }
