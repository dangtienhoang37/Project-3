// rate.model.ts
import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../../config/db';


class Rate extends Model {
    public rateId!: string;
    public dayRate!: number;
    public nightRate!: number;
    public additionalInfo!: string;
}

Rate.init(
    {
        rateId: {
            type: DataTypes.STRING,
            allowNull: false,
            primaryKey: true,
        },
        dayRate: {
            type: DataTypes.FLOAT,
            allowNull: false,
        },
        nightRate: {
            type: DataTypes.FLOAT,
            allowNull: false,
        },
        additionalInfo: {
            type: DataTypes.STRING,
            allowNull: true,
        },
    },
    {
        sequelize,
        modelName: 'Rate',
        tableName: 'Rates', // Tên bảng trong cơ sở dữ liệu
    }
);

export default Rate;
