// invoice.model.ts
import { DataTypes, Model } from 'sequelize';
import Vehicle from '../Vehicle/vehicle.schema';
import ParkingLot from '../parking/parkingLot/parkinglot.schema';
import { sequelize } from '../../config/db';
import Rate from '../rate/rate.schema';
import Account from '../account/account.schema';


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
            type: DataTypes.UUID,
            allowNull: false,
            primaryKey: true,
        },
        accountId: {
            type: DataTypes.UUID,
            allowNull: false
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
Invoice.belongsTo(ParkingLot, { foreignKey: 'parkingLotId', targetKey: 'parkingLotId' });
Invoice.belongsTo(Rate, { foreignKey: 'rateId', targetKey: 'rateId' });
Invoice.belongsTo(Vehicle, { foreignKey: 'licensePlate', targetKey: 'licensePlate' });
Invoice.belongsTo(Account, { foreignKey: 'accountId', targetKey: 'accountId' })

export default Invoice;
