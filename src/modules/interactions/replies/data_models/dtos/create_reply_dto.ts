import { BaseDTO } from "src/modules/core/data_models/dtos/base_dto";
import { ReplyEntity } from "../entities/reply_entity";

export class CreateReplyDTO extends BaseDTO{
    declare reply: ReplyEntity;
}