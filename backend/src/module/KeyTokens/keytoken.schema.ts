import { DataTypes, Model } from "sequelize";
import { sequelize } from "../../config/db";
import Account from "../account/account.schema";



class KeyToken extends Model {
    public accountId!: string
    public refreshToken!: string
    public publicKey!: string
    public privateKey!: string

}

KeyToken.init(
    {
        refreshToken: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: ""

        },
        accountId: {
            type: DataTypes.UUID,
            allowNull: false,
            primaryKey: true
        },
        publicKey: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        privateKey: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
    },
    {
        sequelize,
        modelName: 'KeyToken',
        tableName: 'keyTokens'
    }
);
KeyToken.belongsTo(Account, { foreignKey: 'accountId', targetKey: 'accountId' });
export default KeyToken
