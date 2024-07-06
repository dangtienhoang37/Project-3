import { DataTypes, Model } from "sequelize";
import { sequelize } from "../../config/db";
import Account from "../account/account.schema";



class Wallet extends Model {
    public walletId!: string;
    public accountId!: string;
    public availableBalance!: number
}
Wallet.init({
    walletId: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true
    },
    accountId: {
        type: DataTypes.UUID,
        allowNull: false
    },
    availableBalance: {
        type: DataTypes.BIGINT,
        allowNull: false,
        defaultValue: 0
    }
}, {
    sequelize,
    modelName: "wallet",
    tableName: "wallets"
})
Wallet.belongsTo(Account, { foreignKey: 'accountId', targetKey: 'accountId' });
export default Wallet