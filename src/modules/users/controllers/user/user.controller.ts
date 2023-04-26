import { Body, Controller, Delete, Get, Post, Put } from '@nestjs/common';
import { UserService } from '../../services/user/user.service';
import { BaseCreateResponse } from 'src/modules/core/data_models/responses/base_create_response';
import { BaseDeleteResponse } from 'src/modules/core/data_models/responses/base_delete_response';
import { BaseReadResponse } from 'src/modules/core/data_models/responses/base_read_response';
import { UserEntity } from '../../data_models/entities/user_entity';
import { Failure } from 'src/modules/core/errors/failure';
import { BaseUpdateResponse } from 'src/modules/core/data_models/responses/base_update_response';
import { CreateUserDTO } from '../../data_models/dtos/create_user_dto';
import { UpdateUserDTO } from '../../data_models/dtos/update_user_dto';

@Controller('user')
export class UserController {
    constructor(
        private readonly userService: UserService) { }


    @Post('create')
    createUser(@Body() createUserDTO: CreateUserDTO)
        : Promise<BaseCreateResponse | Failure> {
        return new Promise(async (resolve, _) => {
            resolve(await this.userService.createUser(createUserDTO));
        });
    }

    @Put('update')
    updateUser(@Body() updateUserDTO: UpdateUserDTO)
        : Promise<BaseUpdateResponse | Failure> {
        return new Promise(async (resolve, _) => {
            resolve(await this.userService.updateUser(updateUserDTO));
        });
    }

    @Delete('cancel')
    deleteUser()
        : Promise<BaseDeleteResponse | Failure> {
        return new Promise(async (resolve, _) => {
            resolve(await this.userService.deleteUser());
        });
    }

    @Get('get')
    getUser(): Promise<BaseReadResponse<UserEntity> | Failure> {
        return new Promise(async (resolve, _) => {
            resolve(await this.userService.getUser());
        });
    }
}
