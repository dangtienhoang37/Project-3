// invoice.model.ts
import { DataTypes, Model } from 'sequelize';
import Vehicle from '../Vehicle/vehicle.schema';
import ParkingLot from '../parking/parkingLot/parkinglot.schema';
import { sequelize } from '../../config/db';
import Rate from '../rate/rate.schema';


class Invoice extends Model {
    public invoiceId!: string;
    public licensePlate!: string;
    public parkingLotId!: string;
    public rateId!: string;
    public startTime!: Date;
    public endTime!: Date;
    public dayDuration!: number;
    public nightDuration!: number;
    public totalPrice!: number;
}

Invoice.init(
    {
        invoiceId: {
            type: DataTypes.STRING,
            allowNull: false,
            primaryKey: true,
        },
        licensePlate: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        parkingLotId: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        rateId: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        startTime: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        endTime: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        dayDuration: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        nightDuration: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        totalPrice: {
            type: DataTypes.FLOAT,
            allowNull: false,
        },
    },
    {
        sequelize,
        modelName: 'Invoice',
        tableName: 'Invoices', // Tên bảng trong cơ sở dữ liệu
    }
);

// Tạo mối quan hệ một-nhiều giữa bảng Invoice và các bảng khác
Invoice.belongsTo(ParkingLot, { foreignKey: 'parkingLotId' });
Invoice.belongsTo(Rate, { foreignKey: 'rateId' });
Invoice.belongsTo(Vehicle, { foreignKey: 'licensePlate' });

export default Invoice;