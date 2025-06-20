import { Model, InferAttributes, InferCreationAttributes, CreationOptional, DataTypes } from 'sequelize';
import database from "../config/database";
import bcrypt from 'bcrypt';

export enum Currency {
    MYR = "MYR",
    IDR = "IDR",
    USD = "USD",
}

export enum Language {
    Malaysian = "Malaysian",
    English = "English",
    Indonesian = "Indonesian",
}

interface UserAttributes {
    id: number;
    name: string;
    email: string;
    password: string;
    role: string;
    currency: Currency;
    language: Language;
}

class User extends Model<InferAttributes<User>, InferCreationAttributes<User>> {
    declare id: CreationOptional<number>;
    declare name: string;
    declare email: string;
    declare password: string;
    declare role: string;
    declare currency: CreationOptional<Currency>;
    declare language: CreationOptional<Language>;

    public async comparePassword(password: string): Promise<boolean> {
        return await bcrypt.compare(password, this.password);
    }
}

User.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: {
                    msg: "Name can't be empty"
                }
            }
        },
        email: {
            type: DataTypes.STRING,
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

            type: DataTypes.STRING,
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
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: {
                    msg: "Role can't be empty"
                }
            }
        },
        currency: {
            type: DataTypes.ENUM("MYR", "IDR", "USD"),
            defaultValue: Currency.MYR,
        },
        language: {
            type: DataTypes.ENUM("Malaysian", "English", "Indonesian"),
            defaultValue: Language.Malaysian,
        }
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
            },
        },
        defaultScope: {
            attributes: {
                exclude: ['password']
            }
        },
    }
);

export { User, UserAttributes };