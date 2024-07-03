import { DataTypes, Model } from "sequelize";
import { sequelize } from "../../config/db";
import Account from "../account/account.schema";



class TokenUsed extends Model {
    public refreshTokenUsed!: string


}

TokenUsed.init(
    {
        refreshToken: {
            type: DataTypes.STRING,
            allowNull: false,
            primaryKey: true

        }
    },
    {
        sequelize,
        modelName: 'TokenUsed',
        tableName: 'TokenUsed'
    }
);
export default TokenUsed
