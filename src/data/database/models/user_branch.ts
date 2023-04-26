import { CreationOptional, DataTypes, ForeignKey, InferAttributes, InferCreationAttributes, Model, NonAttribute, Sequelize } from "sequelize";
import { TablesName } from "../helpers/constants";
import { BaseModel } from "./base_model/base_model";
import { Branch } from "./branch";
import { User } from "./user";

class UserBranch extends Model<InferAttributes<UserBranch>, InferCreationAttributes<UserBranch>> implements BaseModel {
    declare id: CreationOptional<number>;
    declare name: string;
    declare createdAt: CreationOptional<Date>;
    declare updatedAt: CreationOptional<Date>;
    declare userId: ForeignKey<User['id']>;
    declare branchId: ForeignKey<Branch['id']>;

    static initialize(sequelize: Sequelize): NonAttribute<void> {
        UserBranch.init(
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
                tableName: TablesName.USER_BRANCHES,
                sequelize
            }
        );
    }

    static associate(models: Map<string, BaseModel>) { }
}

export { UserBranch }

