import { ValidationResult } from "src/modules/core/data_models/validation_result";
import { CreateHiringRequestDTO } from "../../data_models/dtos/create_hiring_request_dto";
import { BaseParam } from "src/modules/core/data_models/params/base_param";

export abstract class HiringRequestValidator {

    abstract canUserApplyForHiringRequest(param: BaseParam<any>): Promise<ValidationResult>;

    // by created we mean pending or accepted
    abstract isRejectedOrNotAlreadyCreated(param: BaseParam<CreateHiringRequestDTO>): Promise<ValidationResult>;

    // if you wanna cancel HR you must have sent it first.
    // abstract isSent(param: BaseParam<any>): Promise<ValidationResult>;

    // you can not reject someone's HR unless it is pending
    // you can not add user to branch unless his HR is pending
    abstract isPending(param: BaseParam<any>): Promise<ValidationResult>;    // because the id of hiring request is in base params

    // for canceling, notice we don't consider "not created" state for this validator since database model can throw this exception
    // abstract neitherAlreadyAcceptedNorRejected(param: BaseParam<any>): Promise<ValidationResult>;
}