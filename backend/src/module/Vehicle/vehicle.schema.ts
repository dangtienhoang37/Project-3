// vehicle.model.ts
import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../../config/db';
import User from '../user/user.schema';

class Vehicle extends Model {
    public licensePlate!: string;
    public userId!: string;
}

Vehicle.init(
    {
        licensePlate: {
            type: DataTypes.STRING,
            allowNull: false,
            primaryKey: true,
        },
        userId: {
            type: DataTypes.UUID,
            allowNull: false,
        },
    },
    {
        sequelize,
        modelName: 'Vehicle',
        tableName: 'Vehicles', // Tên bảng trong cơ sở dữ liệu
    }
);

// Tạo mối quan hệ một-nhiều giữa bảng Vehicle và bảng User
Vehicle.belongsTo(User, { foreignKey: 'userId' });

export default Vehicle;
