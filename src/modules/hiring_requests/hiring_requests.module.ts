import { Module } from '@nestjs/common';
import { HiringRequestController } from './controllers/hiring_request/hiring_request.controller';
import { HiringRequestService } from './services/hiring_request/hiring_request.service';
import { HiringRequestDataSourceImpl } from './data_source/hiring_request_data_source_impl/hiring_request_data_source_impl';
import { HiringRequestRepositoryImpl } from './repository/hiring_request_repository_impl/hiring_request_repository_impl';
import { HiringRequestHandlerImpl } from './inspectors/handlers/hiring_request_handler_impl/hiring_request_handler_impl';
import { HiringRequestHandlersWrapper } from './inspectors/handlers/hiring_request_handlers_wrapper/hiring_request_handlers_wrapper';
import { HiringRequestValidatorsWrapper } from './inspectors/validators/hiring_request_validators_wrapper/hiring_request_validators_wrapper';
import { HiringRequestValidatorImpl } from './inspectors/validators/hiring_request_validator_impl/hiring_request_validator_impl';
import { CoreModule } from '../core/core.module';
import { Db } from 'src/data/database/db/db';

@Module({
  imports: [CoreModule],
  controllers: [HiringRequestController],
  providers: [HiringRequestService, HiringRequestDataSourceImpl, HiringRequestRepositoryImpl, HiringRequestHandlerImpl, HiringRequestHandlersWrapper, HiringRequestValidatorsWrapper, HiringRequestValidatorImpl, Db]
})
export class HiringRequestsModule { }
