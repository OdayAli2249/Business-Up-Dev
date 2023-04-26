import { CUDResponseTemplateMessages } from "../../helpers/constants";
import { CUDResponseObjects } from "../enums/cud_response_objects";
import { BaseCUDResponse } from "./base_cud_response";

export class BaseCreateResponse extends BaseCUDResponse {

    private constructor(id: number, cudResponseObjects: CUDResponseObjects) {
        super(id, cudResponseObjects);
        BaseCreateResponse.templateMessage = CUDResponseTemplateMessages.CREATE_TEMPLATE_MESSAGE;
    }

    static build(id: number, cudResponseObjects: CUDResponseObjects): BaseCreateResponse {
        return new BaseCreateResponse(id, cudResponseObjects);
    }
}