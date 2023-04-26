import { Module } from '@nestjs/common';
import { CommentRepositoryImpl } from './repository/comment_repository_impl/comment_repository_impl';
import { CommentDataSourceImpl } from './data_source/comment_data_source_impl/comment_data_source_impl';
import { CommentValidatorImpl } from './inspectors/validators/comment_validator_impl/comment_validator_impl';
import { CommentValidatorsWrapper } from './inspectors/validators/comment_validators_wrapper/comment_validators_wrapper';
import { CommentHandlersWrapper } from './inspectors/handlers/comment_handlers_wrapper/comment_handlers_wrapper';
import { Db } from 'src/data/database/db/db';

@Module({
  exports: [CommentRepositoryImpl, CommentDataSourceImpl, CommentValidatorImpl, CommentValidatorsWrapper, CommentHandlersWrapper],
  providers: [CommentRepositoryImpl, CommentDataSourceImpl, CommentValidatorImpl, CommentValidatorsWrapper, CommentHandlersWrapper, Db]
})
export class CommentsModule { }
