import { Module } from '@nestjs/common';
import { databaseProvider } from 'src/data/database/db/db';
import { CoreDataSourceImpl } from './data_source/core_data_source_impl/core_data_source_impl';
import { CoreValidatorImpl } from './inspectors/validators/core_validator_impl/core_validator_impl';
import { CoreRepositoryImpl } from './repository/core_repository_impl/core_repository_impl';

@Module({
    exports: [databaseProvider,
        CoreDataSourceImpl,
        CoreValidatorImpl,
        CoreRepositoryImpl],
    providers: [databaseProvider,
        CoreDataSourceImpl,
        CoreValidatorImpl,
        CoreRepositoryImpl],
})
export class CoreModule { }
