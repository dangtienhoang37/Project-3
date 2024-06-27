// bookingSchedule.model.ts
import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../../config/db';
import ParkingLot from '../parking/parkingLot/parkinglot.schema';
import User from '../user/user.schema';


class BookingSchedule extends Model {
    public scheduleId!: string;
    public userId!: string;
    public parkingLotId!: string;
    public startTime!: Date;
}

BookingSchedule.init(
    {
        scheduleId: {
            type: DataTypes.STRING,
            allowNull: false,
            primaryKey: true,
        },
        userId: {
            type: DataTypes.UUID,
            allowNull: false,
        },
        parkingLotId: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        startTime: {
            type: DataTypes.DATE,
            allowNull: false,
        },
    },
    {
        sequelize,
        modelName: 'BookingSchedule',
        tableName: 'BookingSchedules', // Tên bảng trong cơ sở dữ liệu
    }
);

// Tạo mối quan hệ một-nhiều giữa bảng BookingSchedule và các bảng khác
BookingSchedule.belongsTo(User, { foreignKey: 'userId' });
BookingSchedule.belongsTo(ParkingLot, { foreignKey: 'parkingLotId' });

export default BookingSchedule;
