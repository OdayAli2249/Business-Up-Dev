import { CUDResponseTemplateMessages } from "../../helpers/constants";
import { CUDResponseObjects } from "../enums/cud_response_objects";
import { BaseCUDResponse } from "./base_cud_response";

export class BaseUpdateResponse extends BaseCUDResponse {

    private constructor(id: number, cudResponseObjects: string[]) {
        super(id, cudResponseObjects);
        BaseUpdateResponse.templateMessage = CUDResponseTemplateMessages.UPDATE_TEMPLATE_MESSAGE;
        this.operation = BaseUpdateResponse.templateMessage;
    }

    static build(id: number, cudResponseObjects: string[]): BaseUpdateResponse {
        return new BaseUpdateResponse(id, cudResponseObjects);
    }
}