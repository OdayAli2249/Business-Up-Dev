import { Association, CreationOptional, DataTypes, ForeignKey, HasManyAddAssociationMixin, HasManyAddAssociationsMixin, HasManyCountAssociationsMixin, HasManyCreateAssociationMixin, HasManyGetAssociationsMixin, HasManyHasAssociationMixin, HasManyHasAssociationsMixin, HasManyRemoveAssociationMixin, HasManyRemoveAssociationsMixin, HasManySetAssociationsMixin, InferAttributes, InferCreationAttributes, Model, NonAttribute, Sequelize } from "sequelize";
import { ForeignKeys, ModelsName, TablesName } from "../helpers/constants";
import { BaseModel } from "./base_model/base_model";
import { Post } from "./post";
import { Product } from "./products";
import { Service } from "./service";
import { ServiceProvider } from "./service_provider";
import { UserBranch } from "./user_branch";
import { User } from "./user";

class Branch extends Model<InferAttributes<Branch, { omit: 'posts' | 'products' | 'services' | 'userBranches' }>, InferCreationAttributes<Branch, { omit: 'posts' | 'products' | 'services' | 'userBranches' }>> implements BaseModel {
    declare id: CreationOptional<number>;
    declare name: string;
    declare createdAt: CreationOptional<Date>;
    declare updatedAt: CreationOptional<Date>;
    declare serviceProviderId: ForeignKey<ServiceProvider['id']>;


    declare getPosts: HasManyGetAssociationsMixin<Post>;
    declare addPost: HasManyAddAssociationMixin<Post, number>;
    declare addPosts: HasManyAddAssociationsMixin<Post, number>;
    declare setPosts: HasManySetAssociationsMixin<Post, number>;
    declare removePost: HasManyRemoveAssociationMixin<Post, number>;
    declare removePosts: HasManyRemoveAssociationsMixin<Post, number>;
    declare hasPost: HasManyHasAssociationMixin<Post, number>;
    declare hasPosts: HasManyHasAssociationsMixin<Post, number>;
    declare countPosts: HasManyCountAssociationsMixin;
    declare createPost: HasManyCreateAssociationMixin<Post, 'branchId'>;

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
    declare createProduct: HasManyCreateAssociationMixin<Product, 'branchId'>;

    declare products?: NonAttribute<Product[]>;

    declare getServices: HasManyGetAssociationsMixin<Service>;
    declare addService: HasManyAddAssociationMixin<Service, number>;
    declare addServices: HasManyAddAssociationsMixin<Service, number>;
    declare setServices: HasManySetAssociationsMixin<Service, number>;
    declare removeService: HasManyRemoveAssociationMixin<Service, number>;
    declare removeServices: HasManyRemoveAssociationsMixin<Service, number>;
    declare hasService: HasManyHasAssociationMixin<Service, number>;
    declare hasServices: HasManyHasAssociationsMixin<Service, number>;
    declare countServices: HasManyCountAssociationsMixin;
    declare createService: HasManyCreateAssociationMixin<Service, 'branchId'>;

    declare services?: NonAttribute<Service[]>;

    declare getUserBranches: HasManyGetAssociationsMixin<UserBranch>;
    declare addUserBranch: HasManyAddAssociationMixin<UserBranch, number>;
    declare addUserBranches: HasManyAddAssociationsMixin<UserBranch, number>;
    declare setUserBranches: HasManySetAssociationsMixin<UserBranch, number>;
    declare removeUserBranch: HasManyRemoveAssociationMixin<UserBranch, number>;
    declare removeUserBranches: HasManyRemoveAssociationsMixin<UserBranch, number>;
    declare hasUserBranch: HasManyHasAssociationMixin<UserBranch, number>;
    declare hasUserBranches: HasManyHasAssociationsMixin<UserBranch, number>;
    declare countUserBranches: HasManyCountAssociationsMixin;
    declare createUserBranch: HasManyCreateAssociationMixin<UserBranch, 'branchId'>;

    declare userBranches?: NonAttribute<UserBranch[]>;
    declare branches?: NonAttribute<Comment[]>;
    getUsers(): Promise<User[]> {              // TO DO add filtering maybe
        return new Promise(async (resolve, _) => {
            let userBranches: UserBranch[] = await UserBranch.findAll({ where: { branchId: this.id } })
            resolve(await User.findAll({ where: { id: userBranches.map((userBranch, index, arr) => userBranch.userId) } }));
        })
    }

    declare static associations: {
        posts: Association<Branch, Post>;
        products: Association<Branch, Product>;
        services: Association<Branch, Service>;
        userBranches: Association<Branch, UserBranch>
    };

    static initialize(sequelize: Sequelize): NonAttribute<void> {
        Branch.init(
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
                createdAt: DataTypes.DATE,
                updatedAt: DataTypes.DATE,
            },
            {
                tableName: TablesName.BRANCHES,
                sequelize
            }
        );
    }

    static associate(models: Map<string, BaseModel>) {

        Branch.belongsToMany(models[ModelsName.USERS], { through: models[ModelsName.USER_BRANCHES], foreignKey: ForeignKeys.BRANCHE });
        Branch.belongsTo(models[ModelsName.SERVICE_PROVIDERS], { foreignKey: ForeignKeys.SERVICE_PROVIDER });
        Branch.hasMany(models[ModelsName.SERVICES], {
            foreignKey: {
                allowNull: false,
                name: ForeignKeys.BRANCHE
            }
        });
        Branch.hasMany(models[ModelsName.PRODUCTS], {
            foreignKey: {
                allowNull: false,
                name: ForeignKeys.BRANCHE
            }
        });
        Branch.hasMany(models[ModelsName.PERMISSION_GROUPS], {
            foreignKey: {
                name: ForeignKeys.BRANCHE
            }
        });
    }
}

export { Branch }

