import { Model } from "sequelize";
import { Branch } from "../models/branch";
import { Order } from "../models/order";
import { OrderItem } from "../models/order_item";
import { Product } from "../models/products";
import { Reaction } from "../models/reaction";
import { Reply } from "../models/reply";
import { Service } from "../models/service";
import { ServiceProvider } from "../models/service_provider";
import { Subscribtion } from "../models/subscribtion";
import { User } from "../models/user";
import { UserBranch } from "../models/user_branch";
import { Comment } from "../models/comment";
import { Post } from "../models/post";
import { HiringRequest } from "../models/hiring_request";
import { PermissionGroup } from "../models/permission_group";
import { Permission } from "../models/permission";
import { UserServiceProviderRole } from "../models/user_service_provider_role";

abstract class ModelsName {
    public static readonly BRANCHES: string = 'BRANCHES';
    public static readonly COMMENTS: string = 'COMMENTS';
    public static readonly ORDER_ITEMS: string = 'ORDER_ITEMS';
    public static readonly ORDERS: string = 'ORDERS';
    public static readonly POSTS: string = 'POSTS';
    public static readonly PRODUCTS: string = 'PRODUCTS';
    public static readonly REACTIONS: string = 'REACTIONS';
    public static readonly REPLIES: string = 'REPLIES';
    public static readonly SERVICE_PROVIDERS: string = 'SERVICE_PROVIDERS';
    public static readonly SERVICES: string = 'SERVICES';
    public static readonly SUBSCRIBTIONS: string = 'SUBSCRIBTIONS';
    public static readonly USER_BRANCHES: string = 'USER_BRANCHES';
    public static readonly USERS: string = 'USERS';
    public static readonly HIRING_REQUESTS: string = 'HIRING_REQUESTS';
    public static readonly PERMISSIONS: string = 'PERMISSIONS';
    public static readonly PERMISSION_GROUPS: string = 'PERMISSION_GROUPS';
    public static readonly USER_SERVICE_PROVIDER_ROLES: string = 'USER_SERVICE_PROVIDER_ROLES';

    public static readonly MODELS_LIST: string[] = [
        ModelsName.BRANCHES,
        ModelsName.COMMENTS,
        ModelsName.ORDERS,
        ModelsName.ORDER_ITEMS,
        ModelsName.POSTS,
        ModelsName.PRODUCTS,
        ModelsName.REACTIONS,
        ModelsName.REPLIES,
        ModelsName.SERVICES,
        ModelsName.SERVICE_PROVIDERS,
        ModelsName.SUBSCRIBTIONS,
        ModelsName.USER_BRANCHES,
        ModelsName.USERS,
        ModelsName.HIRING_REQUESTS,
        ModelsName.PERMISSIONS,
        ModelsName.PERMISSION_GROUPS,
        ModelsName.USER_SERVICE_PROVIDER_ROLES]
}

abstract class ForeignKeys {
    public static readonly BRANCHE: string = 'branchId';
    public static readonly COMMENT: string = 'commentId';
    public static readonly ORDER_ITEM: string = 'orderItemId';
    public static readonly ORDER: string = 'orderId';
    public static readonly POST: string = 'postId';
    public static readonly PRODUCT: string = 'productId';
    public static readonly REACTION: string = 'reactionId';
    public static readonly REPLY: string = 'replyId';
    public static readonly SERVICE_PROVIDER: string = 'serviceProviderId';
    public static readonly SERVICE: string = 'serviceId';
    // public static readonly SUBSCRIBTION: string = 'subscribtionId';
    public static readonly USER_BRANCHE: string = 'userBranchId';
    public static readonly USER: string = 'userId';
    public static readonly PERMISSION_GROUP: string = 'permissionGroupId';

}

abstract class TablesName {
    public static readonly BRANCHES: string = 'branches';
    public static readonly COMMENTS: string = 'comments';
    public static readonly ORDER_ITEMS: string = 'order_items';
    public static readonly ORDERS: string = 'orders';
    public static readonly POSTS: string = 'posts';
    public static readonly PRODUCTS: string = 'products';
    public static readonly REACTIONS: string = 'reactions';
    public static readonly REPLIES: string = 'replies';
    public static readonly SERVICE_PROVIDERS: string = 'service_providers';
    public static readonly SERVICES: string = 'services';
    public static readonly SUBSCRIBTIONS: string = 'subscribtions';
    public static readonly USER_BRANCHES: string = 'user_branches';
    public static readonly USERS: string = 'users';
    public static readonly HIRING_REQUESTS: string = 'hiring_requests';
    public static readonly PERMISSION_GROUPS: string = 'permission_groups';
    public static readonly PERMISSIONS: string = 'permissions';
    public static readonly USER_SERVICE_PROVIDER_ROLES: string = 'user_service_provider_roles';


    public static readonly TABLES_LIST: string[] = [
        TablesName.BRANCHES,
        TablesName.COMMENTS,
        TablesName.ORDERS,
        TablesName.ORDER_ITEMS,
        TablesName.POSTS,
        TablesName.PRODUCTS,
        TablesName.REACTIONS,
        TablesName.REPLIES,
        TablesName.SERVICES,
        TablesName.SERVICE_PROVIDERS,
        TablesName.SUBSCRIBTIONS,
        TablesName.USER_BRANCHES,
        TablesName.USERS,
        TablesName.HIRING_REQUESTS,
        TablesName.PERMISSION_GROUPS,
        TablesName.PERMISSIONS,
        TablesName.USER_SERVICE_PROVIDER_ROLES]
}


const modelClasses = new Map<string, Model>();


modelClasses[ModelsName.BRANCHES] = Branch;
modelClasses[ModelsName.COMMENTS] = Comment;
modelClasses[ModelsName.ORDERS] = Order;
modelClasses[ModelsName.ORDER_ITEMS] = OrderItem;
modelClasses[ModelsName.POSTS] = Post;
modelClasses[ModelsName.PRODUCTS] = Product;
modelClasses[ModelsName.REACTIONS] = Reaction;
modelClasses[ModelsName.REPLIES] = Reply;
modelClasses[ModelsName.SERVICES] = Service;
modelClasses[ModelsName.SERVICE_PROVIDERS] = ServiceProvider;
modelClasses[ModelsName.SUBSCRIBTIONS] = Subscribtion;
modelClasses[ModelsName.USER_BRANCHES] = UserBranch;
modelClasses[ModelsName.USERS] = User;
modelClasses[ModelsName.HIRING_REQUESTS] = HiringRequest;
modelClasses[ModelsName.PERMISSION_GROUPS] = PermissionGroup;
modelClasses[ModelsName.PERMISSIONS] = Permission;
modelClasses[ModelsName.USER_SERVICE_PROVIDER_ROLES] = UserServiceProviderRole;

export { ModelsName, ForeignKeys, TablesName, modelClasses }


