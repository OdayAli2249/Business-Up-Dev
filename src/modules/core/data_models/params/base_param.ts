import { BaseDTO } from "../dtos/base_dto";
import { UserRole } from "../enums/user_role";

export class BaseParam<T extends BaseDTO>{
    private data: T;
    private metaData: Metadata;
    private queryParam: Map<string, any>
    private pathParam: Map<string, any>;

    private constructor(
        data: T,
        metaData: Metadata,
        queryParam: Map<string, any>,
        pathParam: Map<string, any>
    ) {
        this.data = data;
        this.metaData = metaData;
        this.queryParam = queryParam;
        this.pathParam = pathParam;
    }

    static build<T extends BaseDTO>(options: {
        data: T,
        metaData: Metadata,
        queryParam: Map<string, any>,
        pathParam: Map<string, any>
    }): BaseParam<T> {
        return new BaseParam(options.data, options.metaData, options.queryParam, options.pathParam);
    }

    setData(data: T) {
        this.data = data;
    }

    getData(): T {
        return this.data;
    }

    setMetaData(metaData: Metadata) {
        this.metaData = metaData;
    }

    getMetaData(): Metadata {
        return this.metaData;
    }

    setPathParam(pathParam: Map<string, any>) {
        this.pathParam = pathParam;
    }

    getPathParam(): Map<string, any> {
        return this.pathParam;
    }

    setQueryParam(queryParam: Map<string, any>) {
        this.queryParam = queryParam;
    }

    getQueryParam(): Map<string, any> {
        return this.queryParam;
    }
}


class Metadata {
    userId: number;
    userRoles: UserRole[]
}