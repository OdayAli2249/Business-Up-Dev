import { Module } from '@nestjs/common';
import { ReactionRepositoryImpl } from './repository/reaction_repository_impl/reaction_repository_impl';
import { ReactionDataSourceImpl } from './data_source/reaction_data_source_impl/reaction_data_source_impl';
import { ReactionHandlerImpl } from './inspectors/handlers/reaction_handler_impl/reaction_handler_impl';
import { ReactionValidatorImpl } from './inspectors/validators/reaction_validator_impl/reaction_validator_impl';
import { ReactionValidatorsWrapper } from './inspectors/validators/reaction_validators_wrapper/reaction_validators_wrapper';
import { ReactionHandlersWrapper } from './inspectors/handlers/reaction_handlers_wrapper/reaction_handlers_wrapper';
import { Db } from 'src/data/database/db/db';

@Module({
  exports: [ReactionRepositoryImpl, ReactionDataSourceImpl, ReactionHandlerImpl, ReactionValidatorImpl, ReactionValidatorsWrapper, ReactionHandlersWrapper],
  providers: [ReactionRepositoryImpl, ReactionDataSourceImpl, ReactionHandlerImpl, ReactionValidatorImpl, ReactionValidatorsWrapper, ReactionHandlersWrapper,Db]
})
export class ReactionsModule { }
