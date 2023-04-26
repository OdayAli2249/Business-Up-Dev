import { Injectable } from '@nestjs/common';
import { ServiceValidator } from '../service_validator';
import { CoreValidatorImpl } from 'src/modules/core/inspectors/validators/core_validator_impl/core_validator_impl';
import { Db } from 'src/data/database/db/db';
import { ValidationResult } from 'src/modules/core/data_models/validation_result';
import { CreateServiceDTO } from '../../../data_models/dtos/create_service_dto';
import { UpdateServiceDTO } from '../../../data_models/dtos/update_service_dto';
import { BaseParam } from 'src/modules/core/data_models/params/base_param';

@Injectable()
export class ServiceValidatorImpl extends CoreValidatorImpl implements ServiceValidator {
    constructor(private readonly database: Db) {
        super()
    }
    canDisplayServices(param: BaseParam<any>): Promise<ValidationResult> {
        return new Promise(async (resolve, _) => {
            // there are no restrictions on temporary service display now, maybe will be in future
            resolve(ValidationResult.buildSuccess())
        });
    }
    noTemporaryServiceUpdateDeny(param: BaseParam<UpdateServiceDTO>): Promise<ValidationResult> {
        return new Promise(async (resolve, _) => {
            // there are no restrictions on temporary service update now, maybe will be in future
            resolve(ValidationResult.buildSuccess())
        });
    }
    noTemporaryServiceCreateDeny(param: BaseParam<CreateServiceDTO>): Promise<ValidationResult> {
        return new Promise(async (resolve, _) => {
            // there are no restrictions on temporary service create now, maybe will be in future
            resolve(ValidationResult.buildSuccess())
        });
    }
    noTemporaryServiceDeleteDeny(param: BaseParam<any>): Promise<ValidationResult> {
        return new Promise(async (resolve, _) => {
            // there are no restrictions on temporary service delete now, maybe will be in future
            resolve(ValidationResult.buildSuccess())
        });
    }
}
