// account.model.ts
import { DataTypes, Model, Sequelize } from 'sequelize';
import { sequelize } from '../../config/db';
import User from '../user/user.schema';

class Account extends Model {
    public accountId!: string;
    public username!: string;
    public password!: string;
    public status!: string;
    public permissions!: string;
    public userId!: string;
    public accessToken!: string;
    public refreshToken!: string;
    public publicKey!: string;
    public privateKey!: string;
}

Account.init(
    {
        accountId: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            allowNull: false,
            primaryKey: true
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        status: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        permissions: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        userId: {
            type: DataTypes.UUID,
            allowNull: false,
        },
        refreshToken: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        publicKey: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        privateKey: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
    },
    {
        sequelize,
        modelName: 'Account',
        tableName: 'accounts', // Tên bảng trong cơ sở dữ liệu
    }
);
Account.belongsTo(User, { foreignKey: 'userId', targetKey: 'userId' });

export default Account;
