import { Module } from '@nestjs/common';
import { ContentController } from './content_controllers/content/content.controller';
import { ContentService } from './content_services/content/content.service';
import { ServicesModule } from './services/services.module';
import { ProductsModule } from './products/products.module';
import { PostsModule } from './posts/posts.module';
import { CoreModule } from '../core/core.module';

@Module({
  imports: [PostsModule, ProductsModule, ServicesModule, CoreModule],
  controllers: [ContentController],
  providers: [ContentService]
})
export class ContentModule { }
