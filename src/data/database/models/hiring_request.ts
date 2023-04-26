import { Association, CreationOptional, DataTypes, ForeignKey, HasManyAddAssociationMixin, HasManyAddAssociationsMixin, HasManyCountAssociationsMixin, HasManyCreateAssociationMixin, HasManyGetAssociationsMixin, HasManyHasAssociationMixin, HasManyHasAssociationsMixin, HasManyRemoveAssociationMixin, HasManyRemoveAssociationsMixin, HasManySetAssociationsMixin, InferAttributes, InferCreationAttributes, Model, NonAttribute, Sequelize } from "sequelize";
import { ForeignKeys, ModelsName, TablesName } from "../helpers/constants";
import { BaseModel } from "./base_model/base_model";
import { Post } from "./post";
import { Reply } from "./reply";
import { Service } from "./service";
import { ServiceProvider } from "./service_provider";
import { User } from "./user";

class HiringRequest extends Model<InferAttributes<HiringRequest>, InferCreationAttributes<HiringRequest>> implements BaseModel {
    declare id: CreationOptional<number>;
    declare name: string;
    declare createdAt: CreationOptional<Date>;
    declare updatedAt: CreationOptional<Date>;
    declare userId: ForeignKey<User['id']>;
    declare serviceProviderId: ForeignKey<ServiceProvider['id']>;

    getUser(): Promise<User> {              // TO DO add filtering maybe
        return new Promise(async (resolve, _) => {
            let user: User = await User.findOne({ where: { id: this.userId } })
            resolve(user);
        })
    }

    getServiceProvider(): Promise<ServiceProvider> {              // TO DO add filtering maybe
        return new Promise(async (resolve, _) => {
            let serviceProvider: ServiceProvider = await ServiceProvider.findOne({ where: { id: this.serviceProviderId } })
            resolve(serviceProvider);
        })
    }

    static initialize(sequelize: Sequelize): NonAttribute<void> {
        HiringRequest.init(
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
                tableName: TablesName.HIRING_REQUESTS,
                sequelize
            }
        );
    }

    static associate(models: Map<string, BaseModel>) { }
}

export { HiringRequest }

