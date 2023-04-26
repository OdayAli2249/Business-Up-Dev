import { Association, CreationOptional, DataTypes, ForeignKey, HasManyAddAssociationMixin, HasManyAddAssociationsMixin, HasManyCountAssociationsMixin, HasManyCreateAssociationMixin, HasManyGetAssociationsMixin, HasManyHasAssociationMixin, HasManyHasAssociationsMixin, HasManyRemoveAssociationMixin, HasManyRemoveAssociationsMixin, HasManySetAssociationsMixin, InferAttributes, InferCreationAttributes, Model, NonAttribute, Sequelize } from "sequelize";
import { ForeignKeys, ModelsName, TablesName } from "../helpers/constants";
import { BaseModel } from "./base_model/base_model";
import { Post } from "./post";
import { Reply } from "./reply";
import { Service } from "./service";
import { ServiceProvider } from "./service_provider";
import { User } from "./user";

class UserServiceProviderRole extends Model<InferAttributes<UserServiceProviderRole>, InferCreationAttributes<UserServiceProviderRole>> implements BaseModel {
    declare id: CreationOptional<number>;
    declare role: string;
    declare createdAt: CreationOptional<Date>;
    declare updatedAt: CreationOptional<Date>;
    declare userId: ForeignKey<User['id']>;
    declare serviceProviderId: ForeignKey<ServiceProvider['id']>;


    static initialize(sequelize: Sequelize): NonAttribute<void> {
        UserServiceProviderRole.init(
            {
                id: {
                    type: DataTypes.INTEGER.UNSIGNED,
                    autoIncrement: true,
                    primaryKey: true
                },
                role: {
                    type: new DataTypes.STRING(128),
                },
                createdAt: DataTypes.DATE,
                updatedAt: DataTypes.DATE,
            },
            {
                tableName: TablesName.USER_SERVICE_PROVIDER_ROLES,
                sequelize
            }
        );
    }

    static associate(models: Map<string, BaseModel>) { }
}

export { UserServiceProviderRole }

