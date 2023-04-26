import { Association, CreationOptional, DataTypes, ForeignKey, HasManyAddAssociationMixin, HasManyAddAssociationsMixin, HasManyCountAssociationsMixin, HasManyCreateAssociationMixin, HasManyGetAssociationsMixin, HasManyHasAssociationMixin, HasManyHasAssociationsMixin, HasManyRemoveAssociationMixin, HasManyRemoveAssociationsMixin, HasManySetAssociationsMixin, InferAttributes, InferCreationAttributes, Model, NonAttribute, Sequelize } from "sequelize";
import { ForeignKeys, ModelsName, TablesName } from "../helpers/constants";
import { BaseModel } from "./base_model/base_model";
import { Branch } from "./branch";

class PermissionGroup extends Model<InferAttributes<PermissionGroup>, InferCreationAttributes<PermissionGroup>> implements BaseModel {
    declare id: CreationOptional<number>;
    declare name: string;
    declare createdAt: CreationOptional<Date>;
    declare updatedAt: CreationOptional<Date>;
    declare branchId: ForeignKey<Branch['id']>;



    static initialize(sequelize: Sequelize): NonAttribute<void> {
        PermissionGroup.init(
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
                tableName: TablesName.PERMISSION_GROUPS,
                sequelize
            }
        );
    }

    static associate(models: Map<string, BaseModel>) {
        PermissionGroup.hasMany(models[ModelsName.PERMISSIONS], {
            foreignKey: {
                allowNull: false,
                name: ForeignKeys.PERMISSION_GROUP
            }
        });
        PermissionGroup.belongsTo(models[ModelsName.BRANCHES], {
            foreignKey: ForeignKeys.BRANCHE

        });
    }
}

export { PermissionGroup }

