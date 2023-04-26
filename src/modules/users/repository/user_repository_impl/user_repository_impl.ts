import { Injectable } from '@nestjs/common';
import { UserRepository } from '../user_repository';
import { UserDataSourceImpl } from '../../data_source/user_data_source_impl/user_data_source_impl';
import { UserHandlersWrapper } from '../../inspectors/handlers/user_handlers_wrapper/user_handlers_wrapper';
import { CoreRepositoryImpl } from 'src/modules/core/repository/core_repository_impl/core_repository_impl';
import { FailureOr } from 'src/modules/core/data_models/failure_or';
import { BaseParam } from 'src/modules/core/data_models/params/base_param';
import { BaseCreateResponse } from 'src/modules/core/data_models/responses/base_create_response';
import { BaseDeleteResponse } from 'src/modules/core/data_models/responses/base_delete_response';
import { BaseReadResponse } from 'src/modules/core/data_models/responses/base_read_response';
import { BaseUpdateResponse } from 'src/modules/core/data_models/responses/base_update_response';
import { CreateUserDTO } from '../../data_models/dtos/create_user_dto';
import { UpdateUserDTO } from '../../data_models/dtos/update_user_dto';
import { UserEntity } from '../../data_models/entities/user_entity';

@Injectable()
export class UserRepositoryImpl extends CoreRepositoryImpl implements UserRepository {
    constructor(private readonly userHandlersWrapper: UserHandlersWrapper, private readonly userDataSource: UserDataSourceImpl) {
        super()
    }
    createUser(param: BaseParam<CreateUserDTO>): Promise<FailureOr<BaseCreateResponse>> {
        return this.userHandlersWrapper.handle(param, () => {
            return new Promise(async (resolve, reject) => {
                let response: BaseCreateResponse;
                try {
                    response = await this.userDataSource.createUser(param);
                    resolve(response);
                } catch (err) {
                    reject(err);
                }
            })
        })
    }
    updateUser(param: BaseParam<UpdateUserDTO>): Promise<FailureOr<BaseUpdateResponse>> {
        return this.userHandlersWrapper.handle(param, () => {
            return new Promise(async (resolve, reject) => {
                let response: BaseUpdateResponse;
                try {
                    response = await this.userDataSource.updateUser(param);
                    resolve(response);
                } catch (err) {
                    reject(err);
                }
            })
        })
    }
    deleteUser(param: BaseParam<any>): Promise<FailureOr<BaseDeleteResponse>> {
        return this.userHandlersWrapper.handle(param, () => {
            return new Promise(async (resolve, reject) => {
                let response: BaseDeleteResponse;
                try {
                    response = await this.userDataSource.deleteUser(param);
                    resolve(response);
                } catch (err) {
                    reject(err);
                }
            })
        })
    }
    getUser(param: BaseParam<any>): Promise<FailureOr<BaseReadResponse<UserEntity>>> {
        return this.userHandlersWrapper.handle(param, () => {
            return new Promise(async (resolve, reject) => {
                let response: BaseReadResponse<UserEntity>;
                try {
                    response = await this.userDataSource.getUser(param);
                    resolve(response);
                } catch (err) {
                    reject(err);
                }
            })
        })
    }
}
