// area.model.ts
import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../../config/db';




class ApiKey extends Model {
    public key!: string;
    public status!: string;
    public permissions!: string;
    public createdAt!: string;
}

ApiKey.init(
    {
        key: {
            type: DataTypes.STRING,
            allowNull: false,
            primaryKey: true,
        },
        status: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: true
        },
        permissions: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    },
    {
        sequelize,
        modelName: 'ApiKey',
        tableName: 'ApiKeys', // Tên bảng trong cơ sở dữ liệu
    }
);

// Tạo mối quan hệ một-nhiều giữa bảng Area và bảng Account
// Area.belongsTo(Account, { foreignKey: 'accountId' });

export default ApiKey;
