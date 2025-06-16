import { Model, InferAttributes, InferCreationAttributes, CreationOptional } from 'sequelize';
import database from "../config/database";
import { DataType } from 'sequelize-typescript';
import bcrypt from 'bcrypt';

interface UserAttributes {
    id: number;
    name: string;
    email: string;
    password: string;
    role: string;
}

class User extends Model<InferAttributes<User>, InferCreationAttributes<User>> {
    declare id: CreationOptional<number>;
    declare name: string;
    declare email: string;
    declare password: string;
    declare role: string;

    public async comparePassword(password: string): Promise<boolean> {
        return await bcrypt.compare(password, this.password);
    }
}

User.init(
    {
        id: {
            type: DataType.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        name: {
            type: DataType.STRING,
            allowNull: false,
            validate: {
                notEmpty: {
                    msg: "Name can't be empty"
                }
            }
        },
        email: {
            type: DataType.STRING,
            allowNull: false,
            unique: true,
            validate: {
                isEmail: {
                    msg: "Must be valid email address"
                },
                notEmpty: {
                    msg: "Email can't be empty"
                }
            }
        },
        password: {
            type: DataType.STRING,
            allowNull: false,
            validate: {
                notEmpty: {
                    msg: "Password can't be empty"
                },
                isValidPassword(value: string) {
                    if (value.length < 8) {
                        throw new Error("Password must be more than 8 characters");
                    }
                }
            }
        },
        role: {
            type: DataType.STRING,
            allowNull: false,
            validate: {
                notEmpty: {
                    msg: "Role can't be empty"
                }
            }
        },
    },
    {
        tableName: "Users",
        timestamps: true,
        sequelize: database.sequelize,
        modelName: "User",
        hooks: {
            beforeCreate: async (user: User) => {
                if (user.password) {
                    const salt = await bcrypt.genSalt(10);
                    user.password = await bcrypt.hash(user.password, salt);
                }
            },
            beforeUpdate: async (user: User) => {
                if (user.changed('password')) {
                    const salt = await bcrypt.genSalt(10);
                    user.password = await bcrypt.hash(user.password, salt);
                }
            }
        }
    }
);

export { User, UserAttributes };