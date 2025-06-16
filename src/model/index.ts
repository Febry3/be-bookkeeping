// model/index.ts
import { User } from "./user";
import { Income } from "./income";
import { Asset } from "./asset";
import { Equity } from "./equity";
import { Investation } from "./investation";
import { Liability } from "./liability";
import { Loan } from "./loan";
import { Spend } from "./spend";

// Relasi
Income.belongsTo(User, { foreignKey: 'userId' });
User.hasMany(Income, { foreignKey: 'userId' });

Spend.belongsTo(User, { foreignKey: 'userId' });
User.hasMany(Spend, { foreignKey: 'userId' });

Asset.belongsTo(User, { foreignKey: 'userId' });
User.hasMany(Asset, { foreignKey: 'userId' });

Equity.belongsTo(User, { foreignKey: 'userId' });
User.hasMany(Equity, { foreignKey: 'userId' });

Investation.belongsTo(User, { foreignKey: 'userId' });
User.hasMany(Investation, { foreignKey: 'userId' });

Loan.belongsTo(User, { foreignKey: 'userId' });
User.hasMany(Loan, { foreignKey: 'userId' });

Liability.belongsTo(User, { foreignKey: 'userId' });
User.hasMany(Liability, { foreignKey: 'userId' });

export {
  User, Income, Asset, Equity, Investation, Liability, Loan, Spend
};
