import { ValidationResult } from "src/modules/core/data_models/validation_result";
import { CreateServiceDTO } from "../../data_models/dtos/create_service_dto";
import { UpdateServiceDTO } from "../../data_models/dtos/update_service_dto";
import { BaseParam } from "src/modules/core/data_models/params/base_param";

export abstract class ServiceValidator {

    abstract canDisplayServices(param: BaseParam<any>): Promise<ValidationResult>;

    abstract noTemporaryServiceUpdateDeny(param: BaseParam<UpdateServiceDTO>): Promise<ValidationResult>;

    abstract noTemporaryServiceCreateDeny(param: BaseParam<CreateServiceDTO>): Promise<ValidationResult>;

    abstract noTemporaryServiceDeleteDeny(param: BaseParam<any>): Promise<ValidationResult>;

}