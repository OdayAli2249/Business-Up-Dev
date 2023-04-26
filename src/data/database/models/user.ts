import { Association, CreationOptional, DataTypes, HasManyAddAssociationMixin, HasManyAddAssociationsMixin, HasManyCountAssociationsMixin, HasManyCreateAssociationMixin, HasManyGetAssociationsMixin, HasManyHasAssociationMixin, HasManyHasAssociationsMixin, HasManyRemoveAssociationMixin, HasManyRemoveAssociationsMixin, HasManySetAssociationsMixin, InferAttributes, InferCreationAttributes, Model, NonAttribute, Sequelize } from "sequelize";
import { ForeignKeys, ModelsName, TablesName } from "../helpers/constants";
import { BaseModel } from "./base_model/base_model";
import { Comment } from "./comment";
import { Order } from "./order";
import { Post } from "./post";
import { Product } from "./products";
import { Reaction } from "./reaction";
import { Reply } from "./reply";
import { Service } from "./service";
import { Subscribtion } from "./subscribtion";
import { UserBranch } from "./user_branch";
import { UserRole } from "src/modules/core/data_models/enums/user_role";
import { UserServiceProviderRole } from "./user_service_provider_role";
import { Branch } from "./branch";

class User extends Model<InferAttributes<User, { omit: 'comments' | 'orders' | 'posts' | 'products' | 'reactions' | 'replies' | 'services' | 'subscribtions' | 'userBranches' }>, InferCreationAttributes<User, { omit: 'comments' | 'orders' | 'posts' | 'products' | 'reactions' | 'replies' | 'services' | 'subscribtions' | 'userBranches' }>> implements BaseModel {
    declare id: CreationOptional<number>;
    declare name: string;
    declare firstName: string;
    declare lastName: string;
    declare createdAt: CreationOptional<Date>;
    declare updatedAt: CreationOptional<Date>;

    declare getComments: HasManyGetAssociationsMixin<Comment>;
    declare addComment: HasManyAddAssociationMixin<Comment, number>;
    declare addComments: HasManyAddAssociationsMixin<Comment, number>;
    declare setComments: HasManySetAssociationsMixin<Comment, number>;
    declare removeComment: HasManyRemoveAssociationMixin<Comment, number>;
    declare removeComments: HasManyRemoveAssociationsMixin<Comment, number>;
    declare hasComment: HasManyHasAssociationMixin<Comment, number>;
    declare hasComments: HasManyHasAssociationsMixin<Comment, number>;
    declare countComments: HasManyCountAssociationsMixin;
    declare createComment: HasManyCreateAssociationMixin<Comment, 'userId'>;

    declare comments?: NonAttribute<Comment[]>;

    declare getOrders: HasManyGetAssociationsMixin<Order>;
    declare addOrder: HasManyAddAssociationMixin<Order, number>;
    declare addOrders: HasManyAddAssociationsMixin<Order, number>;
    declare setOrders: HasManySetAssociationsMixin<Order, number>;
    declare removeOrder: HasManyRemoveAssociationMixin<Order, number>;
    declare removeOrders: HasManyRemoveAssociationsMixin<Order, number>;
    declare hasOrder: HasManyHasAssociationMixin<Order, number>;
    declare hasOrders: HasManyHasAssociationsMixin<Order, number>;
    declare countOrders: HasManyCountAssociationsMixin;
    declare createOrder: HasManyCreateAssociationMixin<Order, 'userId'>;

    declare orders?: NonAttribute<Order[]>;

    declare getPosts: HasManyGetAssociationsMixin<Post>;
    declare addPost: HasManyAddAssociationMixin<Post, number>;
    declare addPosts: HasManyAddAssociationsMixin<Post, number>;
    declare setPosts: HasManySetAssociationsMixin<Post, number>;
    declare removePost: HasManyRemoveAssociationMixin<Post, number>;
    declare removePosts: HasManyRemoveAssociationsMixin<Post, number>;
    declare hasPost: HasManyHasAssociationMixin<Post, number>;
    declare hasPosts: HasManyHasAssociationsMixin<Post, number>;
    declare countPosts: HasManyCountAssociationsMixin;
    declare createPost: HasManyCreateAssociationMixin<Post, 'userId'>;

    declare posts?: NonAttribute<Post[]>;

    declare getProducts: HasManyGetAssociationsMixin<Product>;
    declare addProduct: HasManyAddAssociationMixin<Product, number>;
    declare addProducts: HasManyAddAssociationsMixin<Product, number>;
    declare setProducts: HasManySetAssociationsMixin<Product, number>;
    declare removeProduct: HasManyRemoveAssociationMixin<Product, number>;
    declare removeProducts: HasManyRemoveAssociationsMixin<Product, number>;
    declare hasProduct: HasManyHasAssociationMixin<Product, number>;
    declare hasProducts: HasManyHasAssociationsMixin<Product, number>;
    declare countProducts: HasManyCountAssociationsMixin;
    declare createProduct: HasManyCreateAssociationMixin<Product, 'userId'>;

    declare products?: NonAttribute<Product[]>;

    declare getReactions: HasManyGetAssociationsMixin<Reaction>;
    declare addReaction: HasManyAddAssociationMixin<Reaction, number>;
    declare addReactions: HasManyAddAssociationsMixin<Reaction, number>;
    declare setReactions: HasManySetAssociationsMixin<Reaction, number>;
    declare removeReaction: HasManyRemoveAssociationMixin<Reaction, number>;
    declare removeReactions: HasManyRemoveAssociationsMixin<Reaction, number>;
    declare hasReaction: HasManyHasAssociationMixin<Reaction, number>;
    declare hasReactions: HasManyHasAssociationsMixin<Reaction, number>;
    declare countReactions: HasManyCountAssociationsMixin;
    declare createReaction: HasManyCreateAssociationMixin<Reaction, 'userId'>;

    declare reactions?: NonAttribute<Reaction[]>;

    declare getReplies: HasManyGetAssociationsMixin<Reply>;
    declare addReply: HasManyAddAssociationMixin<Reply, number>;
    declare addReplies: HasManyAddAssociationsMixin<Reply, number>;
    declare setReplies: HasManySetAssociationsMixin<Reply, number>;
    declare removeReply: HasManyRemoveAssociationMixin<Reply, number>;
    declare removeReplies: HasManyRemoveAssociationsMixin<Reply, number>;
    declare hasReply: HasManyHasAssociationMixin<Reply, number>;
    declare hasReplies: HasManyHasAssociationsMixin<Reply, number>;
    declare countReplies: HasManyCountAssociationsMixin;
    declare createReply: HasManyCreateAssociationMixin<Reply, 'userId'>;

    declare replies?: NonAttribute<Reply[]>;

    declare getServices: HasManyGetAssociationsMixin<Service>;
    declare addService: HasManyAddAssociationMixin<Service, number>;
    declare addServices: HasManyAddAssociationsMixin<Service, number>;
    declare setServices: HasManySetAssociationsMixin<Service, number>;
    declare removeService: HasManyRemoveAssociationMixin<Service, number>;
    declare removeServices: HasManyRemoveAssociationsMixin<Service, number>;
    declare hasService: HasManyHasAssociationMixin<Service, number>;
    declare hasServices: HasManyHasAssociationsMixin<Service, number>;
    declare countServices: HasManyCountAssociationsMixin;
    declare createService: HasManyCreateAssociationMixin<Service, 'userId'>;

    declare services?: NonAttribute<Service[]>;

    declare getSubscribtions: HasManyGetAssociationsMixin<Subscribtion>;
    declare addSubscribtion: HasManyAddAssociationMixin<Subscribtion, number>;
    declare addSubscribtions: HasManyAddAssociationsMixin<Subscribtion, number>;
    declare setSubscribtions: HasManySetAssociationsMixin<Subscribtion, number>;
    declare removeSubscribtion: HasManyRemoveAssociationMixin<Subscribtion, number>;
    declare removeSubscribtions: HasManyRemoveAssociationsMixin<Subscribtion, number>;
    declare hasSubscribtion: HasManyHasAssociationMixin<Subscribtion, number>;
    declare hasSubscribtions: HasManyHasAssociationsMixin<Subscribtion, number>;
    declare countSubscribtions: HasManyCountAssociationsMixin;
    declare createSubscribtion: HasManyCreateAssociationMixin<Subscribtion, 'userId'>;

    declare subscribtions?: NonAttribute<Subscribtion[]>;

    declare getUserBranches: HasManyGetAssociationsMixin<UserBranch>;
    declare addUserBranch: HasManyAddAssociationMixin<UserBranch, number>;
    declare addUserBranches: HasManyAddAssociationsMixin<UserBranch, number>;
    declare setUserBranches: HasManySetAssociationsMixin<UserBranch, number>;
    declare removeUserBranch: HasManyRemoveAssociationMixin<UserBranch, number>;
    declare removeUserBranches: HasManyRemoveAssociationsMixin<UserBranch, number>;
    declare hasUserBranch: HasManyHasAssociationMixin<UserBranch, number>;
    declare hasUserBranches: HasManyHasAssociationsMixin<UserBranch, number>;
    declare countUserBranches: HasManyCountAssociationsMixin;
    declare createUserBranch: HasManyCreateAssociationMixin<UserBranch, 'userId'>;

    declare userBranches?: NonAttribute<UserBranch[]>;
    // not in the docs< but its required for project logic
    declare branches?: NonAttribute<Branch[]>;

    declare getRoles: HasManyGetAssociationsMixin<UserBranch>;
    declare addRole: HasManyAddAssociationMixin<UserBranch, number>;
    declare addRoles: HasManyAddAssociationsMixin<UserBranch, number>;
    declare setRoles: HasManySetAssociationsMixin<UserBranch, number>;
    declare removeRole: HasManyRemoveAssociationMixin<UserBranch, number>;
    declare removeRolees: HasManyRemoveAssociationsMixin<UserBranch, number>;
    declare hasRole: HasManyHasAssociationMixin<UserBranch, number>;
    declare hasRoles: HasManyHasAssociationsMixin<UserBranch, number>;
    declare countRoles: HasManyCountAssociationsMixin;
    declare createRole: HasManyCreateAssociationMixin<UserBranch, 'userId'>;

    declare roles?: NonAttribute<UserRole[]>;

    declare static associations: {
        comments: Association<User, Comment>;
        orders: Association<User, Order>;
        posts: Association<User, Post>;
        products: Association<User, Product>;
        reactions: Association<User, Reaction>;
        replies: Association<User, Reply>;
        services: Association<User, Service>;
        subscribtions: Association<User, Subscribtion>;
        userBranches: Association<User, UserBranch>;
        roles: Association<User, UserServiceProviderRole>;
    };

    static initialize(sequelize: Sequelize): NonAttribute<void> {
        User.init(
            {
                id: {
                    type: DataTypes.INTEGER.UNSIGNED,
                    autoIncrement: true,
                    primaryKey: true
                },
                name: {
                    type: new DataTypes.STRING(128),
                    allowNull: false
                },
                firstName: {
                    type: new DataTypes.STRING(128),
                    allowNull: false
                },
                lastName: {
                    type: new DataTypes.STRING(128),
                    allowNull: false
                },
                createdAt: DataTypes.DATE,
                updatedAt: DataTypes.DATE,
            },
            {
                tableName: TablesName.USERS,
                sequelize
            }
        );
    }

    static associate(models: Map<string, BaseModel>) {
        User.belongsToMany(models[ModelsName.SERVICE_PROVIDERS], { through: models[ModelsName.SUBSCRIBTIONS], foreignKey: ForeignKeys.USER });
        User.belongsToMany(models[ModelsName.SERVICE_PROVIDERS], { through: models[ModelsName.HIRING_REQUESTS], foreignKey: ForeignKeys.USER });
        User.belongsToMany(models[ModelsName.SERVICE_PROVIDERS], { through: models[ModelsName.USER_SERVICE_PROVIDER_ROLES], foreignKey: ForeignKeys.USER });
        User.belongsToMany(models[ModelsName.BRANCHES], { through: models[ModelsName.USER_BRANCHES], foreignKey: ForeignKeys.USER });
        User.hasMany(models[ModelsName.POSTS], {
            foreignKey: {
                allowNull: false,
                name: ForeignKeys.USER
            }
        });
        User.hasMany(models[ModelsName.SERVICES], {
            foreignKey: {
                allowNull: false,
                name: ForeignKeys.USER
            }
        });
        User.hasMany(models[ModelsName.PRODUCTS], {
            foreignKey: {
                allowNull: false,
                name: ForeignKeys.USER
            }
        });
        User.hasMany(models[ModelsName.COMMENTS], {
            foreignKey: {
                allowNull: false,
                name: ForeignKeys.USER
            }
        });
        User.hasMany(models[ModelsName.REACTIONS], {
            foreignKey: {
                allowNull: false,
                name: ForeignKeys.USER
            }
        });
        User.hasMany(models[ModelsName.REPLIES], {
            foreignKey: {
                allowNull: false,
                name: ForeignKeys.USER
            }
        });
        User.hasMany(models[ModelsName.ORDERS], {
            foreignKey: {
                allowNull: false,
                name: ForeignKeys.USER
            }
        });
        User.hasMany(models[ModelsName.PERMISSIONS], { foreignKey: ForeignKeys.USER });
    }
}

export { User }

