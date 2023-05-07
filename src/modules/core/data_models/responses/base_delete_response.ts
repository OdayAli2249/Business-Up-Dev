import { CUDResponseTemplateMessages } from "../../helpers/constants";
import { CUDResponseObjects } from "../enums/cud_response_objects";
import { BaseCUDResponse } from "./base_cud_response";

export class BaseDeleteResponse extends BaseCUDResponse {

    private constructor(id: number, cudResponseObjects: string[]) {
        super(id, cudResponseObjects);
        BaseDeleteResponse.templateMessage = CUDResponseTemplateMessages.DELETE_TEMPLATE_MESSAGE;
        this.operation = BaseDeleteResponse.templateMessage;
    }

    static build(id: number, cudResponseObjects: string[]): BaseDeleteResponse {
        return new BaseDeleteResponse(id, cudResponseObjects);
    }
}