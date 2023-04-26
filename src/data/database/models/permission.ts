import { Association, CreationOptional, DataTypes, ForeignKey, HasManyAddAssociationMixin, HasManyAddAssociationsMixin, HasManyCountAssociationsMixin, HasManyCreateAssociationMixin, HasManyGetAssociationsMixin, HasManyHasAssociationMixin, HasManyHasAssociationsMixin, HasManyRemoveAssociationMixin, HasManyRemoveAssociationsMixin, HasManySetAssociationsMixin, InferAttributes, InferCreationAttributes, Model, NonAttribute, Sequelize } from "sequelize";
import { ForeignKeys, ModelsName, TablesName } from "../helpers/constants";
import { BaseModel } from "./base_model/base_model";
import { Branch } from "./branch";
import { PermissionGroup } from "./permission_group";
import { Post } from "./post";
import { Product } from "./products";
import { Service } from "./service";
import { User } from "./user";

class Permission extends Model<InferAttributes<Permission>, InferCreationAttributes<Permission>> implements BaseModel {
    declare id: CreationOptional<number>;
    declare name: string;
    declare actions: string;
    declare createdAt: CreationOptional<Date>;
    declare updatedAt: CreationOptional<Date>;
    declare permissionGroupId: ForeignKey<PermissionGroup['id']>;
    declare userId: ForeignKey<User['id']>;
    declare postId: ForeignKey<Post['id']>;
    declare serviceId: ForeignKey<Service['id']>;
    declare productId: ForeignKey<Product['id']>;



    static initialize(sequelize: Sequelize): NonAttribute<void> {
        Permission.init(
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
                actions: {
                    type: new DataTypes.STRING(128),
                    allowNull: false
                },
                createdAt: DataTypes.DATE,
                updatedAt: DataTypes.DATE,
            },
            {
                tableName: TablesName.PERMISSIONS,
                sequelize
            }
        );
    }

    static associate(models: Map<string, BaseModel>) {
        Permission.belongsTo(models[ModelsName.PERMISSION_GROUPS], {
            foreignKey: ForeignKeys.PERMISSION_GROUP

        });

        Permission.belongsTo(models[ModelsName.POSTS], {
            foreignKey: ForeignKeys.POST

        });
        Permission.belongsTo(models[ModelsName.SERVICES], {
            foreignKey: ForeignKeys.SERVICE

        });
        Permission.belongsTo(models[ModelsName.PRODUCTS], {
            foreignKey: ForeignKeys.PRODUCT

        });
        Permission.belongsTo(models[ModelsName.USERS], {
            foreignKey: ForeignKeys.USER

        });
    }
}

export { Permission }

