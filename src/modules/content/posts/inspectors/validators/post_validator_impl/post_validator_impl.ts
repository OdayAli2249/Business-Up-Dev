import { Injectable } from '@nestjs/common';
import { PostValidator } from '../post_validator';
import { CoreValidatorImpl } from 'src/modules/core/inspectors/validators/core_validator_impl/core_validator_impl';
import { Db } from 'src/data/database/db/db';
import { ValidationResult } from 'src/modules/core/data_models/validation_result';
import { CreatePostDTO } from '../../../data_models/dtos/create_post_dto';
import { UpdatePostDTO } from '../../../data_models/dtos/update_post_dto';
import { BaseParam } from 'src/modules/core/data_models/params/base_param';

@Injectable()
export class PostValidatorImpl extends CoreValidatorImpl implements PostValidator {
    constructor(private readonly database: Db) {
        super()
    }
    canDisplayPosts(param: BaseParam<any>): Promise<ValidationResult> {
        return new Promise(async (resolve, _) => {
            // there are no restrictions on temporary post display now, maybe will be in future
            resolve(ValidationResult.buildSuccess())
        });
    }
    noTemporaryPostUpdateDeny(param: BaseParam<UpdatePostDTO>): Promise<ValidationResult> {
        return new Promise(async (resolve, _) => {
            // there are no restrictions on temporary post update now, maybe will be in future
            resolve(ValidationResult.buildSuccess())
        });
    }
    noTemporaryPostCreateDeny(param: BaseParam<CreatePostDTO>): Promise<ValidationResult> {
        return new Promise(async (resolve, _) => {
            // there are no restrictions on temporary post create now, maybe will be in future
            resolve(ValidationResult.buildSuccess())
        });
    }
    noTemporaryPostDeleteDeny(param: BaseParam<any>): Promise<ValidationResult> {
        return new Promise(async (resolve, _) => {
            // there are no restrictions on temporary post delete now, maybe will be in future
            resolve(ValidationResult.buildSuccess())
        });
    }
}
