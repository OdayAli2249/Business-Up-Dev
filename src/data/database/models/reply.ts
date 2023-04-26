import { CreationOptional, DataTypes, ForeignKey, InferAttributes, InferCreationAttributes, Model, NonAttribute, Sequelize } from "sequelize";
import { ForeignKeys, ModelsName, TablesName } from "../helpers/constants";
import { BaseModel } from "./base_model/base_model";
import { Comment } from "./comment";
import { ServiceProvider } from "./service_provider";
import { User } from "./user";

class Reply extends Model<InferAttributes<Reply>, InferCreationAttributes<Reply>> implements BaseModel {
    declare id: CreationOptional<number>;
    declare name: string;
    declare createdAt: CreationOptional<Date>;
    declare updatedAt: CreationOptional<Date>;
    declare userId: ForeignKey<User['id']>;
    declare serviceProviderId: ForeignKey<ServiceProvider['id']>;
    declare commentId: ForeignKey<Comment['id']>;

    static initialize(sequelize: Sequelize): NonAttribute<void> {
        Reply.init(
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
                tableName: TablesName.REPLIES,
                sequelize
            }
        );
    }

    static associate(models: Map<string, BaseModel>) {
        Reply.belongsTo(models[ModelsName.USERS], { foreignKey: ForeignKeys.USER });
        Reply.belongsTo(models[ModelsName.SERVICE_PROVIDERS], { foreignKey: ForeignKeys.SERVICE_PROVIDER });
        Reply.belongsTo(models[ModelsName.COMMENTS], { foreignKey: ForeignKeys.COMMENT });
    }
}

export { Reply }