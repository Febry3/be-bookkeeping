import { DataTypes, ForeignKey, Model, CreationOptional, InferAttributes, InferCreationAttributes } from "sequelize";
import { User } from "./user";
import database from "../config/database";

class Liability extends Model<InferAttributes<Liability>, InferCreationAttributes<Liability>> {
    declare liabilityId: CreationOptional<number>;
    declare liabilityType: string;
    declare liabilityCategory: string;
    declare amount: number;
    declare description: CreationOptional<string>;
    declare createdAt: CreationOptional<Date>;
    declare updatedAt: CreationOptional<Date>;
    declare dueDate: CreationOptional<Date>;
    declare userId: ForeignKey<User['id']>;
}

Liability.init({
    liabilityId: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    liabilityType: { type: DataTypes.STRING, allowNull: false },
    liabilityCategory: { type: DataTypes.STRING, allowNull: false },
    amount: { type: DataTypes.DECIMAL(20, 2), allowNull: false, validate: { min: 0 } },
    description: { type: DataTypes.STRING },
    dueDate: { type: DataTypes.DATE, allowNull: true },
    userId: { type: DataTypes.INTEGER, references: { model: User, key: "id" } },
    createdAt: { type: DataTypes.DATE },
    updatedAt: { type: DataTypes.DATE }
}, {
    tableName: "Liabilities",
    timestamps: true,
    sequelize: database.sequelize,
    modelName: "Liability",
});

Liability.belongsTo(User, { foreignKey: 'userId', as: "user", onDelete: "CASCADE" });

export { Liability };