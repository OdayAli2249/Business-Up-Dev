import { Module } from '@nestjs/common';
import { UserController } from './controllers/user/user.controller';
import { UserValidatorImpl } from './inspectors/validators/user_validator_impl/user_validator_impl';
import { UserHandlerImpl } from './inspectors/handlers/user_handler_impl/user_handler_impl';
import { UserDataSourceImpl } from './data_source/user_data_source_impl/user_data_source_impl';
import { UserRepositoryImpl } from './repository/user_repository_impl/user_repository_impl';
import { UserValidatorsWrapper } from './inspectors/validators/user_validators_wrapper/user_validators_wrapper';
import { UserHandlersWrapper } from './inspectors/handlers/user_handlers_wrapper/user_handlers_wrapper';
import { CoreModule } from '../core/core.module';
import { Db } from 'src/data/database/db/db';
import { UserService } from './services/user/user.service';

@Module({
  imports: [CoreModule],
  controllers: [UserController],
  providers: [UserValidatorImpl, UserHandlerImpl, UserDataSourceImpl, UserRepositoryImpl, UserValidatorsWrapper, UserHandlersWrapper, Db, UserService]
})
export class UsersModule { }
