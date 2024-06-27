// parkingSpot.model.ts
import { DataTypes, Model } from 'sequelize';
import ParkingLot from '../parkingLot/parkinglot.schema';
import Vehicle from '../../Vehicle/vehicle.schema';
import { sequelize } from '../../../config/db';


class ParkingSpot extends Model {
    public spotNumber!: number;
    public parkingLotId!: string;
    public currentVehiclePlate!: string | null;
    public status!: string;
    public daySentTime!: number;
    public nightSentTime!: number;
    public currentPriceEstimate!: number;
}

ParkingSpot.init(
    {
        spotNumber: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
        },
        parkingLotId: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        currentVehiclePlate: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        status: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        daySentTime: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        nightSentTime: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        currentPriceEstimate: {
            type: DataTypes.FLOAT,
            allowNull: false,
        },
    },
    {
        sequelize,
        modelName: 'ParkingSpot',
        tableName: 'ParkingSpots', // Tên bảng trong cơ sở dữ liệu
    }
);

// Tạo mối quan hệ một-nhiều giữa bảng ParkingSpot và bảng ParkingLot
ParkingSpot.belongsTo(ParkingLot, { foreignKey: 'parkingLotId' });
// Tạo mối quan hệ một-nhiều giữa bảng ParkingSpot và bảng Vehicle
ParkingSpot.belongsTo(Vehicle, { foreignKey: 'currentVehiclePlate', as: 'vehicle' });

export default ParkingSpot;
