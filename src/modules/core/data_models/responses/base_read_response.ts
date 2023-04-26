import { BaseEntity } from "../entities/base_entity";
import { CUDResponseObjects } from "../enums/cud_response_objects";
import { BaseResponse } from "./base_response";

export class BaseReadResponse<T extends BaseEntity> extends BaseResponse {

    private data: T | T[];

    private constructor(data: T | T[]) {
        super();
        this.data = data;
    }

    getData(): T | T[] {
        return this.data;
    }

    static build<T extends BaseEntity>(data: T | T[]): BaseReadResponse<T> {
        return new BaseReadResponse(data);
    }
}