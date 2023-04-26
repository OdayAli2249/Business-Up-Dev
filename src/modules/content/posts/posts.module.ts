import { Module } from '@nestjs/common';
import { PostValidatorImpl } from './inspectors/validators/post_validator_impl/post_validator_impl';
import { PostDataSourceImpl } from './data_source/post_data_source_impl/post_data_source_impl';
import { PostRepositoryImpl } from './repository/post_repository_impl/post_repository_impl';
import { PostValidatorsWrapper } from './inspectors/validators/post_validators_wrapper/post_validators_wrapper';
import { PostHandlersWrapper } from './inspectors/handlers/post_handlers_wrapper/post_handlers_wrapper';
import { Db } from 'src/data/database/db/db';

@Module({
  exports: [PostValidatorImpl, PostDataSourceImpl, PostRepositoryImpl, PostValidatorsWrapper, PostHandlersWrapper],
  providers: [PostValidatorImpl, PostDataSourceImpl, PostRepositoryImpl, PostValidatorsWrapper, PostHandlersWrapper, Db]
})
export class PostsModule { }
