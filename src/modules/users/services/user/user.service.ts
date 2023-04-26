import { Injectable } from '@nestjs/common';
import { UserRepositoryImpl } from '../../repository/user_repository_impl/user_repository_impl';
import { BaseCreateResponse } from 'src/modules/core/data_models/responses/base_create_response';
import { Failure } from 'src/modules/core/errors/failure';
import { FailureOr } from 'src/modules/core/data_models/failure_or';
import { BaseParam } from 'src/modules/core/data_models/params/base_param';
import { ProcessReult } from 'src/modules/core/data_models/enums/process_result';
import { BaseUpdateResponse } from 'src/modules/core/data_models/responses/base_update_response';
import { BaseDeleteResponse } from 'src/modules/core/data_models/responses/base_delete_response';
import { UserEntity } from '../../data_models/entities/user_entity';
import { BaseReadResponse } from 'src/modules/core/data_models/responses/base_read_response';
import { CreateUserDTO } from '../../data_models/dtos/create_user_dto';
import { UpdateUserDTO } from '../../data_models/dtos/update_user_dto';

@Injectable()
export class UserService {
    constructor(
        private readonly userRepository: UserRepositoryImpl) { }

    createUser(createUserDTO: CreateUserDTO): Promise<BaseCreateResponse | Failure> {
        let param: BaseParam<any> = BaseParam.build({
            pathParam: null,
            queryParam: null,
            data: createUserDTO,
            metaData: null
        });
        return new Promise(async (resolve, _) => {
            let request: FailureOr<BaseCreateResponse>;
            request = await this.userRepository.createUser(param);
            resolve(request.getReult() == ProcessReult.success ? request.getResponse() : request.getFailure())
        });
    }

    updateUser(updateUserDTO: UpdateUserDTO): Promise<BaseUpdateResponse | Failure> {
        let param: BaseParam<any> = BaseParam.build({
            pathParam: null,
            queryParam: null,
            data: updateUserDTO,
            metaData: null
        });
        return new Promise(async (resolve, _) => {
            let request: FailureOr<BaseUpdateResponse>;
            request = await this.userRepository.updateUser(param);
            resolve(request.getReult() == ProcessReult.success ? request.getResponse() : request.getFailure())
        });
    }

    deleteUser(): Promise<BaseDeleteResponse | Failure> {
        let pathParam = new Map<string, any>();
        let param: BaseParam<any> = BaseParam.build({
            pathParam: pathParam,
            queryParam: null,
            data: null,
            metaData: null
        });
        return new Promise(async (resolve, _) => {
            let request: FailureOr<BaseDeleteResponse>;
            request = await this.userRepository.deleteUser(param);
            resolve(request.getReult() == ProcessReult.success ? request.getResponse() : request.getFailure())
        });
    }

    getUser()
        : Promise<BaseReadResponse<UserEntity> | Failure> {
        let pathParam = new Map<string, any>();
        let param: BaseParam<any> = BaseParam.build({
            pathParam: pathParam,
            queryParam: null,
            data: null,
            metaData: null
        });
        return new Promise(async (resolve, _) => {
            let request: FailureOr<BaseReadResponse<UserEntity>>;
            request = await this.userRepository.getUser(param);
            resolve(request.getReult() == ProcessReult.success ? request.getResponse() : request.getFailure())
        });
    }
}
