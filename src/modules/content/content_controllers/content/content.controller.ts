import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { ContentService } from '../../content_services/content/content.service';
import { BaseCreateResponse } from 'src/modules/core/data_models/responses/base_create_response';
import { Failure } from 'src/modules/core/errors/failure';
import { BaseUpdateResponse } from 'src/modules/core/data_models/responses/base_update_response';
import { BaseDeleteResponse } from 'src/modules/core/data_models/responses/base_delete_response';
import { PostEntity } from '../../posts/data_models/entities/post_entity';
import { BaseReadResponse } from 'src/modules/core/data_models/responses/base_read_response';
import { ProductEntity } from '../../products/data_models/entities/product_entity';
import { ServiceEntity } from '../../services/data_models/entities/service_entity';
import { CreatePostDTO } from '../../posts/data_models/dtos/create_post_dto';
import { UpdatePostDTO } from '../../posts/data_models/dtos/update_post_dto';
import { CreateProductDTO } from '../../products/data_models/dtos/create_product_dto';
import { UpdateProductDTO } from '../../products/data_models/dtos/update_product_dto';
import { CreateServiceDTO } from '../../services/data_models/dtos/create_service_dto';
import { UpdateServiceDTO } from '../../services/data_models/dtos/update_service_dto';

@Controller('content')
export class ContentController {

// TO DO test the cascading on delete for all entities/tables that may references a content
// because this has not manually done

    constructor(
        private readonly contentService: ContentService) { }

    @Post('post/create/:branchId')
    createPost(@Body() createPostDTO: CreatePostDTO,
        @Param('branchId') branchId: number)
        : Promise<BaseCreateResponse | Failure> {
        return new Promise(async (resolve, _) => {
            resolve(await this.contentService.createPost(createPostDTO, branchId as number));
        });
    }

    @Put('post/update/:postId')
    updatePost(@Body() updatePostDto: UpdatePostDTO, @Param('postId') postId: number)
        : Promise<BaseUpdateResponse | Failure> {
        return new Promise(async (resolve, _) => {
            resolve(await this.contentService.updatePost(updatePostDto, postId as number));
        });
    }

    @Delete('post/delete/:postId')
    deletePost(@Param('postId') postId: number)
        : Promise<BaseDeleteResponse | Failure> {
        return new Promise(async (resolve, _) => {
            resolve(await this.contentService.deletePost(postId as number));
        });
    }


    @Get('post/get/:branchId')
    getPosts(@Param('branchId') branchId: number): Promise<BaseReadResponse<PostEntity> | Failure> {
        return new Promise(async (resolve, _) => {
            resolve(await this.contentService.getPosts(branchId as number));
        });
    }


    @Get('post/get-posts-with-permission/branch/:branchId/user/:userId')
    getPostsWithPermissions(@Param('branchId') branchId: number,
        @Param('userId') userId: number): Promise<BaseReadResponse<PostEntity> | Failure> {
        return new Promise(async (resolve, _) => {
            resolve(await this.contentService.getPostsWithPermissions(branchId as number, userId as number));
        });
    }


    @Post('product/create/:branchId')
    createProduct(@Body() createProductDTO: CreateProductDTO,
        @Param('branchId') branchId: number)
        : Promise<BaseCreateResponse | Failure> {
        return new Promise(async (resolve, _) => {
            resolve(await this.contentService.createProduct(createProductDTO, branchId as number));
        });
    }

    @Put('product/update/:productId')
    updateProduct(@Body() updateProductDto: UpdateProductDTO, @Param('productId') productId: number)
        : Promise<BaseUpdateResponse | Failure> {
        return new Promise(async (resolve, _) => {
            resolve(await this.contentService.updateProduct(updateProductDto, productId as number));
        });
    }

    @Delete('product/delete/:productId')
    deleteProduct(@Param('productId') productId: number)
        : Promise<BaseDeleteResponse | Failure> {
        return new Promise(async (resolve, _) => {
            resolve(await this.contentService.deleteProduct(productId as number));
        });
    }


    @Get('product/get/:branchId')
    getProducts(@Param('branchId') branchId: number): Promise<BaseReadResponse<ProductEntity> | Failure> {
        return new Promise(async (resolve, _) => {
            resolve(await this.contentService.getProducts(branchId as number));
        });
    }


    @Get('product/get-products-with-permission/branch/:branchId/user/:userId')
    getProductsWithPermissions(@Param('branchId') branchId: number,
        @Param('userId') userId: number): Promise<BaseReadResponse<ProductEntity> | Failure> {
        return new Promise(async (resolve, _) => {
            resolve(await this.contentService.getProductsWithPermissions(branchId as number, userId as number));
        });
    }


    @Post('service/create/:branchId')
    createService(@Body() createServicetDTO: CreateServiceDTO,
        @Param('branchId') branchId: number)
        : Promise<BaseCreateResponse | Failure> {
        return new Promise(async (resolve, _) => {
            resolve(await this.contentService.createService(createServicetDTO, branchId as number));
        });
    }

    @Put('service/update/:serviceId')
    updateService(@Body() updateServiceDto: UpdateServiceDTO, @Param('serviceId') serviceId: number)
        : Promise<BaseUpdateResponse | Failure> {
        return new Promise(async (resolve, _) => {
            resolve(await this.contentService.updateService(updateServiceDto, serviceId as number));
        });
    }

    @Delete('service/delete/:serviceId')
    deleteService(@Param('serviceId') serviceId: number)
        : Promise<BaseDeleteResponse | Failure> {
        return new Promise(async (resolve, _) => {
            resolve(await this.contentService.deleteService(serviceId as number));
        });
    }


    @Get('service/get/:branchId')
    getServices(@Param('branchId') branchId: number): Promise<BaseReadResponse<ServiceEntity> | Failure> {
        return new Promise(async (resolve, _) => {
            resolve(await this.contentService.getServices(branchId as number));
        });
    }


    @Get('service/get-services-with-permission/branch/:branchId/user/:userId')
    getServicesWithPermissions(@Param('branchId') branchId: number,
        @Param('userId') userId: number): Promise<BaseReadResponse<ServiceEntity> | Failure> {
        return new Promise(async (resolve, _) => {
            resolve(await this.contentService.getServicesWithPermissions(branchId as number, userId as number));
        });
    }
}
