import { Module } from '@nestjs/common';
import { PermissionController } from './controllers/permission/permission.controller';
import { PermissionService } from './services/permission/permission.service';
import { PermissionDataSourceImpl } from './data_source/permission_data_source_impl/permission_data_source_impl';
import { PermissionRepositoryImpl } from './repository/permission_repository_impl/permission_repository_impl';
import { PermissionHandlerImpl } from './inspectors/handlers/permission_handler_impl/permission_handler_impl';
import { PermissionHandlersWrapper } from './inspectors/handlers/permission_handlers_wrapper/permission_handlers_wrapper';
import { PermissionValidatorImpl } from './inspectors/validators/permission_validator_impl/permission_validator_impl';
import { PermissionValidatorsWrapper } from './inspectors/validators/permission_validators_wrapper/permission_validators_wrapper';
import { CoreModule } from '../core/core.module';
import { Db } from 'src/data/database/db/db';

@Module({
  imports: [CoreModule],
  controllers: [PermissionController],
  providers: [PermissionService, PermissionDataSourceImpl, PermissionRepositoryImpl, PermissionHandlerImpl, PermissionHandlersWrapper, PermissionValidatorImpl, PermissionValidatorsWrapper,Db]
})
export class PermissionsModule { }
