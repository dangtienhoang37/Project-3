// parkingLot.model.ts
import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../../../config/db';
import Account from '../../account/account.schema';



class ParkingLot extends Model {
    public parkingLotId!: string;
    public areaId!: string;
    public location!: string;
    public name!: string;
    public accountId!: string;
    public price!: number;
    public directParkingSpots!: number;
    public availableDirectParkingSpots!: number;
    public reservedParkingSpots!: number;
    public availableReservedParkingSpots!: number;
    public rateId!: string;
}

ParkingLot.init(
    {
        parkingLotId: {
            type: DataTypes.STRING,
            allowNull: false,
            primaryKey: true,
        },
        areaId: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        location: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        accountId: {
            type: DataTypes.UUID,
            allowNull: false,
        },
        price: {
            type: DataTypes.FLOAT,
            allowNull: false,
        },
        directParkingSpots: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        availableDirectParkingSpots: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        reservedParkingSpots: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        availableReservedParkingSpots: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        rateId: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    },
    {
        sequelize,
        modelName: 'ParkingLot',
        tableName: 'ParkingLots', // Tên bảng trong cơ sở dữ liệu
    }
);

// Tạo quan hệ một-một giữa bảng ParkingLot và bảng Account
ParkingLot.belongsTo(Account, { foreignKey: 'accountId' });

export default ParkingLot;
