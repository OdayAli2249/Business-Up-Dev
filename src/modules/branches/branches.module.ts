import { Module } from '@nestjs/common';
import { BranchController } from './controllers/branch/branch.controller';
import { BranchService } from './services/branch/branch.service';
import { BranchDataSourceImpl } from './data_source/branch_data_source_impl/branch_data_source_impl';
import { BranchRepositoryImpl } from './repository/branch_repository_impl/branch_repository_impl';
import { BranchValidatorImpl } from './inspectors/validators/branch_validator_impl/branch_validator_impl';
import { BranchValidatorsWrapper } from './inspectors/validators/branch_validators_wrapper/branch_validators_wrapper';
import { BranchHandlersWrapper } from './inspectors/handlers/branch_handlers_wrapper/branch_handlers_wrapper';
import { CoreModule } from '../core/core.module';
import { Db } from 'src/data/database/db/db';

@Module({
  imports: [CoreModule],
  controllers: [BranchController],
  providers: [BranchService, BranchDataSourceImpl, BranchRepositoryImpl, BranchValidatorImpl, BranchValidatorsWrapper, BranchHandlersWrapper, Db]
})
export class BranchesModule { }
