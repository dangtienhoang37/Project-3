// area.model.ts
import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../../config/db';
import Account from '../account/account.schema';



class Area extends Model {
    public areaId!: string;
    public areaName!: string;
    public accountId!: string;
}

Area.init(
    {
        areaId: {
            type: DataTypes.STRING,
            allowNull: false,
            primaryKey: true,
        },
        areaName: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        accountId: {
            type: DataTypes.UUID,
            allowNull: false,
        },
    },
    {
        sequelize,
        modelName: 'Area',
        tableName: 'Areas', // Tên bảng trong cơ sở dữ liệu
    }
);

// Tạo mối quan hệ một-nhiều giữa bảng Area và bảng Account
Area.belongsTo(Account, { foreignKey: 'accountId' });

export default Area;
