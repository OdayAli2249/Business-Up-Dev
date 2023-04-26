import { Module } from '@nestjs/common';
import { BranchesModule } from './modules/branches/branches.module';
import { OrdersModule } from './modules/orders/orders.module';
import { ServiceProvidersModule } from './modules/service_providers/service_providers.module';
import { SubscribtionsModule } from './modules/subscribtions/subscribtions.module';
import { ContentModule } from './modules/content/content.module';
import { HiringRequestsModule } from './modules/hiring_requests/hiring_requests.module';
import { PermissionsModule } from './modules/permissions/permissions.module';
import { InteractionsModule } from './modules/interactions/interactions.module';
import { ServicesService } from './modules/user/services/services.service';

@Module({
  imports: [BranchesModule, ContentModule, InteractionsModule, OrdersModule, ServiceProvidersModule, SubscribtionsModule, HiringRequestsModule, PermissionsModule],
  providers: [ServicesService],
})
export class AppModule { }
