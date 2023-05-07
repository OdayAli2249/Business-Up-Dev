import { CUDResponseObjects } from "../enums/cud_response_objects";
import { BaseResponse } from "./base_response";

export abstract class BaseCUDResponse extends BaseResponse {

    declare id: number;
    declare protected static templateMessage: string;
    declare cudResponseObjects: string[]
    declare operation: string

    protected constructor(id: number, cudResponseObjects: string[]) {
        super()
        this.id = id;
        this.cudResponseObjects = cudResponseObjects
    }

}