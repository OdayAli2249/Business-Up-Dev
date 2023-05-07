import { CUDResponseTemplateMessages } from "../../helpers/constants";
import { CUDResponseObjects } from "../enums/cud_response_objects";
import { BaseCUDResponse } from "./base_cud_response";

export class BaseCreateResponse extends BaseCUDResponse {

    private constructor(id: number, cudResponseObjects: string[]) {
        super(id, cudResponseObjects);
        BaseCreateResponse.templateMessage = CUDResponseTemplateMessages.CREATE_TEMPLATE_MESSAGE;
        this.operation = BaseCreateResponse.templateMessage;
    }

    static build(id: number, cudResponseObjects: string[]): BaseCreateResponse {
        return new BaseCreateResponse(id, cudResponseObjects);
    }
}