import { ValidationResult } from "src/modules/core/data_models/validation_result";
import { CreateReplyDTO } from "../../data_models/dtos/create_reply_dto";
import { UpdateReplyDTO } from "../../data_models/dtos/update_reply_dto";
import { BaseParam } from "src/modules/core/data_models/params/base_param";

export abstract class ReplyValidator {

    abstract noReplyCreationBlocked(param: BaseParam<CreateReplyDTO>): Promise<ValidationResult>

    abstract canUpdateReply(param: BaseParam<UpdateReplyDTO>): Promise<ValidationResult>

    abstract canDeleteReply(param: BaseParam<any>): Promise<ValidationResult>

    abstract noRepliesDisplayBlocked(param: BaseParam<any>): Promise<ValidationResult>
    
}