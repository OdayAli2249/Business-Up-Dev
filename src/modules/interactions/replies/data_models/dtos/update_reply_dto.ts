import { BaseDTO } from "src/modules/core/data_models/dtos/base_dto";
import { ReplyEntity } from "../entities/reply_entity";

export class UpdateReplyDTO extends BaseDTO{
    declare reply: ReplyEntity;
}