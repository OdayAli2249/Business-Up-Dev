import { Injectable } from '@nestjs/common';
import { UserDataSource } from '../user_data_source';
import { Db } from 'src/data/database/db/db';
import { UserValidatorsWrapper } from '../../inspectors/validators/user_validators_wrapper/user_validators_wrapper';
import { CoreDataSourceImpl } from 'src/modules/core/data_source/core_data_source_impl/core_data_source_impl';
import { BaseCreateResponse } from 'src/modules/core/data_models/responses/base_create_response';
import { BaseDeleteResponse } from 'src/modules/core/data_models/responses/base_delete_response';
import { BaseReadResponse } from 'src/modules/core/data_models/responses/base_read_response';
import { BaseUpdateResponse } from 'src/modules/core/data_models/responses/base_update_response';
import { CreateUserDTO } from '../../data_models/dtos/create_user_dto';
import { UpdateUserDTO } from '../../data_models/dtos/update_user_dto';
import { UserEntity } from '../../data_models/entities/user_entity';
import { BaseParam } from 'src/modules/core/data_models/params/base_param';
import { CUDResponseObjects } from 'src/modules/core/data_models/enums/cud_response_objects';
import { UserValidationCases } from '../../helpers/constants';
import { User } from 'src/data/database/models/user';

@Injectable()
export class UserDataSourceImpl extends CoreDataSourceImpl implements UserDataSource {
    constructor(private readonly database: Db, private readonly userValidatorsWrapper: UserValidatorsWrapper) {
        super()
    }
    createUser(param: BaseParam<CreateUserDTO>): Promise<BaseCreateResponse> {
        return this.userValidatorsWrapper.validate<BaseCreateResponse, CreateUserDTO>(param, () => {
            return new Promise<BaseCreateResponse>(async (resolve, reject) => {
                try {
                    let user = await User.create(param.getData().user);
                    resolve(BaseCreateResponse.build(user.id, CUDResponseObjects.user));
                } catch (err) {
                    reject(err)
                }
            });

        },
            [])
    }
    updateUser(param: BaseParam<UpdateUserDTO>): Promise<BaseUpdateResponse> {
        return this.userValidatorsWrapper.validate<BaseUpdateResponse, UpdateUserDTO>(param, () => {
            return new Promise<BaseUpdateResponse>(async (resolve, reject) => {
                try {
                    let updateUserMetaData = param.getMetaData();
                    await User.update(param.getData().user, { where: { id: updateUserMetaData.userId } });
                    resolve(BaseUpdateResponse.build(updateUserMetaData.userId, CUDResponseObjects.user));
                } catch (err) {
                    reject(err)
                }
            });

        },
            [
                UserValidationCases.UPDATE_PROFILE_TIME_STAMP_AUTHORIZED,
            ])
    }
    deleteUser(param: BaseParam<any>): Promise<BaseDeleteResponse> {
        return this.userValidatorsWrapper.validate<BaseDeleteResponse, any>(param, () => {
            return new Promise<BaseDeleteResponse>(async (resolve, reject) => {
                try {
                    let deleteUserMetaData = param.getMetaData();
                    await User.destroy({ where: { id: deleteUserMetaData.userId } });
                    resolve(BaseDeleteResponse.build(deleteUserMetaData.userId, CUDResponseObjects.user));
                } catch (err) {
                    reject(err)
                }
            });

        },
            [])
    }
    getUser(param: BaseParam<any>): Promise<BaseReadResponse<UserEntity>> {
        return this.userValidatorsWrapper.validate<BaseReadResponse<UserEntity>, any>(param, () => {
            return new Promise<BaseReadResponse<UserEntity>>(async (resolve, reject) => {
                try {
                    let user = await User.findOne({ where: { id: param.getMetaData().userId } });
                    resolve(BaseReadResponse.build(await UserEntity.buildFromModel(user, [])));
                } catch (err) {
                    reject(err)
                }
            });

        },
            [])
    }
}
