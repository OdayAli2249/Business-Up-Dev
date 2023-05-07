import { CreationOptional, DataTypes, ForeignKey, InferAttributes, InferCreationAttributes, Model, NonAttribute, Sequelize } from "sequelize";
import { ForeignKeys, ModelsName, TablesName } from "../helpers/constants";
import { BaseModel } from "./base_model/base_model";
import { Post } from "./post";
import { Service } from "./service";
import { ServiceProvider } from "./service_provider";
import { User } from "./user";

class Reaction extends Model<InferAttributes<Reaction>, InferCreationAttributes<Reaction>> implements BaseModel {
    declare id: CreationOptional<number>;
    declare name: string;
    declare createdAt: CreationOptional<Date>;
    declare updatedAt: CreationOptional<Date>;
    declare userId: ForeignKey<User['id']>;
    declare serviceProviderId: ForeignKey<ServiceProvider['id']>;
    declare postId: ForeignKey<Post['id']>;
    declare serviceId: ForeignKey<Service['id']>;

    static initialize(sequelize: Sequelize): NonAttribute<void> {
        Reaction.init(
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
                tableName: TablesName.REACTIONS,
                sequelize
            }
        );
    }

    static associate(models: Map<string, BaseModel>) {
        Reaction.belongsTo(models[ModelsName.USERS], { foreignKey: ForeignKeys.USER, onDelete: 'CASCADE' });
        Reaction.belongsTo(models[ModelsName.SERVICE_PROVIDERS], { foreignKey: ForeignKeys.SERVICE_PROVIDER, onDelete: 'CASCADE' });
        Reaction.belongsTo(models[ModelsName.POSTS], { foreignKey: ForeignKeys.POST, onDelete: 'CASCADE' });
        Reaction.belongsTo(models[ModelsName.SERVICES], { foreignKey: ForeignKeys.SERVICE, onDelete: 'CASCADE' });
    }
}

export { Reaction }

