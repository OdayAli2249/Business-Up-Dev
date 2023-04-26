import { Module } from '@nestjs/common';
import { ReplyRepositoryImpl } from './repository/reply_repository_impl/reply_repository_impl';
import { ReplyDataSourceImpl } from './data_source/reply_data_source_impl/reply_data_source_impl';
import { ReplyValidatorImpl } from './inspectors/validators/reply_validator_impl/reply_validator_impl';
import { ReplyValidatorsWrapper } from './inspectors/validators/reply_validators_wrapper/reply_validators_wrapper';
import { ReplyHandlersWrapper } from './inspectors/handlers/reply_handlers_wrapper/reply_handlers_wrapper';
import { Db } from 'src/data/database/db/db';

@Module({
  exports: [ReplyRepositoryImpl, ReplyDataSourceImpl,  ReplyValidatorImpl, ReplyValidatorsWrapper, ReplyHandlersWrapper],
  providers: [ReplyRepositoryImpl, ReplyDataSourceImpl, ReplyValidatorImpl, ReplyValidatorsWrapper, ReplyHandlersWrapper,Db]
})
export class RepliesModule { }
