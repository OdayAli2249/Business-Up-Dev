import { Injectable } from '@nestjs/common';
import { PostRepositoryImpl } from '../../posts/repository/post_repository_impl/post_repository_impl';
import { ProductRepositoryImpl } from '../../products/repository/product_repository_impl/product_repository_impl';
import { ServiceRepositoryImpl } from '../../services/repository/service_repository_impl/service_repository_impl';
import { BaseCreateResponse } from 'src/modules/core/data_models/responses/base_create_response';
import { Failure } from 'src/modules/core/errors/failure';
import { BaseParam } from 'src/modules/core/data_models/params/base_param';
import { FailureOr } from 'src/modules/core/data_models/failure_or';
import { ProcessReult } from 'src/modules/core/data_models/enums/process_result';
import { BaseDeleteResponse } from 'src/modules/core/data_models/responses/base_delete_response';
import { BaseReadResponse } from 'src/modules/core/data_models/responses/base_read_response';
import { PostEntity } from '../../posts/data_models/entities/post_entity';
import { BaseUpdateResponse } from 'src/modules/core/data_models/responses/base_update_response';
import { ProductEntity } from '../../products/data_models/entities/product_entity';
import { ServiceEntity } from '../../services/data_models/entities/service_entity';
import { CreatePostDTO } from '../../posts/data_models/dtos/create_post_dto';
import { UpdatePostDTO } from '../../posts/data_models/dtos/update_post_dto';
import { CreateProductDTO } from '../../products/data_models/dtos/create_product_dto';
import { UpdateProductDTO } from '../../products/data_models/dtos/update_product_dto';
import { CreateServiceDTO } from '../../services/data_models/dtos/create_service_dto';
import { UpdateServiceDTO } from '../../services/data_models/dtos/update_service_dto';
import { Actions } from 'src/modules/core/helpers/constants';
import { CUDResponseObjects } from 'src/modules/core/data_models/enums/cud_response_objects';

@Injectable()
export class ContentService {

    constructor(
        private readonly postRepository: PostRepositoryImpl,
        private readonly productRepository: ProductRepositoryImpl,
        private readonly serviceRepository: ServiceRepositoryImpl) { }

    createPost(createPostDto: CreatePostDTO, branchId: number): Promise<BaseCreateResponse | Failure> {
        let pathParam = new Map<string, any>();
        pathParam['branchId'] = branchId;
        let param: BaseParam<any> = BaseParam.build({
            pathParam: pathParam,
            queryParam: null,
            data: createPostDto,
            // metaData: null,
            obj: {
                action: Actions.CREATE,
                object: CUDResponseObjects.post
            }
        });
        return new Promise(async (resolve, _) => {
            let request: FailureOr<BaseCreateResponse>;
            request = await this.postRepository.createPost(param);
            resolve(request.getReult() == ProcessReult.success ? request.getResponse() : request.getFailure())
        });
    }

    updatePost(updatePostDto: UpdatePostDTO, postId: number): Promise<BaseUpdateResponse | Failure> {
        let pathParam = new Map<string, any>();
        pathParam['postId'] = postId;
        let param: BaseParam<any> = BaseParam.build({
            pathParam: pathParam,
            queryParam: null,
            data: updatePostDto,
            // metaData: null,
            obj: {
                action: Actions.UPDATE,
                object: CUDResponseObjects.post
            }
        });
        return new Promise(async (resolve, _) => {
            let request: FailureOr<BaseUpdateResponse>;
            request = await this.postRepository.updatePost(param);
            resolve(request.getReult() == ProcessReult.success ? request.getResponse() : request.getFailure())
        });
    }

    deletePost(postId: number): Promise<BaseDeleteResponse | Failure> {
        let pathParam = new Map<string, any>();
        pathParam['postId'] = postId;
        let param: BaseParam<any> = BaseParam.build({
            pathParam: pathParam,
            queryParam: null,
            data: null,
            // metaData: null,
            obj: {
                action: Actions.DELETE,
                object: CUDResponseObjects.post
            }
        });
        return new Promise(async (resolve, _) => {
            let request: FailureOr<BaseDeleteResponse>;
            request = await this.postRepository.deletePost(param);
            resolve(request.getReult() == ProcessReult.success ? request.getResponse() : request.getFailure())
        });
    }

    getPosts(branchId: number)
        : Promise<BaseReadResponse<PostEntity> | Failure> {
        let pathParam = new Map<string, any>();
        pathParam['branchId'] = branchId;
        let param: BaseParam<any> = BaseParam.build({
            pathParam: pathParam,
            queryParam: null,
            data: null,
            // metaData: null,
            obj: {}
        });
        return new Promise(async (resolve, _) => {
            let request: FailureOr<BaseReadResponse<PostEntity>>;
            request = await this.postRepository.getPosts(param);
            resolve(request.getReult() == ProcessReult.success ? request.getResponse() : request.getFailure())
        });
    }

    getPostsWithPermissions(branchId: number, userId: number)
        : Promise<BaseReadResponse<PostEntity> | Failure> {
        let pathParam = new Map<string, any>();
        pathParam['branchId'] = branchId;
        pathParam['userId'] = userId;
        let param: BaseParam<any> = BaseParam.build({
            pathParam: pathParam,
            queryParam: null,
            data: null,
            // metaData: null,
            obj: {}
        });
        return new Promise(async (resolve, _) => {
            let request: FailureOr<BaseReadResponse<PostEntity>>;
            request = await this.postRepository.getPostsWithPermissions(param);
            resolve(request.getReult() == ProcessReult.success ? request.getResponse() : request.getFailure())
        });
    }


    createProduct(createProductDTO: CreateProductDTO,
        branchId: number): Promise<BaseCreateResponse | Failure> {
        let pathParam = new Map<string, any>();
        pathParam['branchId'] = branchId;
        let param: BaseParam<any> = BaseParam.build({
            pathParam: pathParam,
            queryParam: null,
            data: createProductDTO,
            // metaData: null,
            obj: {
                action: Actions.CREATE,
                object: CUDResponseObjects.product
            }
        });
        return new Promise(async (resolve, _) => {
            let request: FailureOr<BaseCreateResponse>;
            request = await this.productRepository.createProduct(param);
            resolve(request.getReult() == ProcessReult.success ? request.getResponse() : request.getFailure())
        });
    }

    updateProduct(updateProductDto: UpdateProductDTO,
        productId: number): Promise<BaseUpdateResponse | Failure> {
        let pathParam = new Map<string, any>();
        pathParam['productId'] = productId;
        let param: BaseParam<any> = BaseParam.build({
            pathParam: pathParam,
            queryParam: null,
            data: updateProductDto,
            // metaData: null,
            obj: {
                action: Actions.UPDATE,
                object: CUDResponseObjects.product
            }
        });
        return new Promise(async (resolve, _) => {
            let request: FailureOr<BaseUpdateResponse>;
            request = await this.productRepository.updateProduct(param);
            resolve(request.getReult() == ProcessReult.success ? request.getResponse() : request.getFailure())
        });
    }

    deleteProduct(productId: number): Promise<BaseDeleteResponse | Failure> {
        let pathParam = new Map<string, any>();
        pathParam['productId'] = productId;
        let param: BaseParam<any> = BaseParam.build({
            pathParam: pathParam,
            queryParam: null,
            data: null,
            // metaData: null,
            obj: {
                action: Actions.DELETE,
                object: CUDResponseObjects.product
            }
        });
        return new Promise(async (resolve, _) => {
            let request: FailureOr<BaseDeleteResponse>;
            request = await this.postRepository.deletePost(param);
            resolve(request.getReult() == ProcessReult.success ? request.getResponse() : request.getFailure())
        });
    }

    getProducts(branchId: number)
        : Promise<BaseReadResponse<ProductEntity> | Failure> {
        let pathParam = new Map<string, any>();
        pathParam['branchId'] = branchId;
        let param: BaseParam<any> = BaseParam.build({
            pathParam: pathParam,
            queryParam: null,
            data: null,
            // metaData: null,
            obj: {}
        });
        return new Promise(async (resolve, _) => {
            let request: FailureOr<BaseReadResponse<ProductEntity>>;
            request = await this.productRepository.getProducts(param);
            resolve(request.getReult() == ProcessReult.success ? request.getResponse() : request.getFailure())
        });
    }

    getProductsWithPermissions(branchId: number, userId: number)
        : Promise<BaseReadResponse<ProductEntity> | Failure> {
        let pathParam = new Map<string, any>();
        pathParam['branchId'] = branchId;
        pathParam['userId'] = userId;
        let param: BaseParam<any> = BaseParam.build({
            pathParam: pathParam,
            queryParam: null,
            data: null,
            // metaData: null,
            obj: {}
        });
        return new Promise(async (resolve, _) => {
            let request: FailureOr<BaseReadResponse<ProductEntity>>;
            request = await this.productRepository.getProductsWithPermissions(param);
            resolve(request.getReult() == ProcessReult.success ? request.getResponse() : request.getFailure())
        });
    }

    createService(createServicetDTO: CreateServiceDTO,
        branchId: number): Promise<BaseCreateResponse | Failure> {
        let pathParam = new Map<string, any>();
        pathParam['branchId'] = branchId;
        let param: BaseParam<any> = BaseParam.build({
            pathParam: pathParam,
            queryParam: null,
            data: createServicetDTO,
            // metaData: null,
            obj: {
                action: Actions.CREATE,
                object: CUDResponseObjects.service
            }
        });
        return new Promise(async (resolve, _) => {
            let request: FailureOr<BaseCreateResponse>;
            request = await this.serviceRepository.createService(param);
            resolve(request.getReult() == ProcessReult.success ? request.getResponse() : request.getFailure())
        });
    }

    updateService(updateProductDto: UpdateServiceDTO,
        serviceId: number): Promise<BaseUpdateResponse | Failure> {
        let pathParam = new Map<string, any>();
        pathParam['serviceId'] = serviceId;
        let param: BaseParam<any> = BaseParam.build({
            pathParam: pathParam,
            queryParam: null,
            data: updateProductDto,
            // metaData: null,
            obj: {
                action: Actions.UPDATE,
                object: CUDResponseObjects.service
            }
        });
        return new Promise(async (resolve, _) => {
            let request: FailureOr<BaseUpdateResponse>;
            request = await this.serviceRepository.updateService(param);
            resolve(request.getReult() == ProcessReult.success ? request.getResponse() : request.getFailure())
        });
    }

    deleteService(serviceId: number): Promise<BaseDeleteResponse | Failure> {
        let pathParam = new Map<string, any>();
        pathParam['serviceId'] = serviceId;
        let param: BaseParam<any> = BaseParam.build({
            pathParam: pathParam,
            queryParam: null,
            data: null,
            // metaData: null,
            obj: {
                action: Actions.DELETE,
                object: CUDResponseObjects.service
            }
        });
        return new Promise(async (resolve, _) => {
            let request: FailureOr<BaseDeleteResponse>;
            request = await this.serviceRepository.deleteService(param);
            resolve(request.getReult() == ProcessReult.success ? request.getResponse() : request.getFailure())
        });
    }

    getServices(branchId: number)
        : Promise<BaseReadResponse<ServiceEntity> | Failure> {
        let pathParam = new Map<string, any>();
        pathParam['branchId'] = branchId;
        let param: BaseParam<any> = BaseParam.build({
            pathParam: pathParam,
            queryParam: null,
            data: null,
            // metaData: null,
            obj: {}
        });
        return new Promise(async (resolve, _) => {
            let request: FailureOr<BaseReadResponse<ServiceEntity>>;
            request = await this.serviceRepository.getServices(param);
            resolve(request.getReult() == ProcessReult.success ? request.getResponse() : request.getFailure())
        });
    }

    getServicesWithPermissions(branchId: number, userId: number)
        : Promise<BaseReadResponse<ServiceEntity> | Failure> {
        let pathParam = new Map<string, any>();
        pathParam['branchId'] = branchId;
        pathParam['userId'] = userId;
        let param: BaseParam<any> = BaseParam.build({
            pathParam: pathParam,
            queryParam: null,
            data: null,
            // metaData: null,
            obj: {}
        });
        return new Promise(async (resolve, _) => {
            let request: FailureOr<BaseReadResponse<ServiceEntity>>;
            request = await this.serviceRepository.getServicesWithPermissions(param);
            resolve(request.getReult() == ProcessReult.success ? request.getResponse() : request.getFailure())
        });
    }
}
