// user.model.ts
import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../../config/db';


class User extends Model {
    public userId!: string;
    public fullName!: string;
    public gender!: string;
    public phoneNumber!: string;
    public idNumber!: string;
    public email!: string;
    public address!: string;
    public dateOfBirth!: Date;
    public portraitImage!: string;
    public accountId!: string;
}

User.init(
    {
        userId: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            allowNull: false,
            primaryKey: true,
        },
        fullName: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        gender: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        phoneNumber: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        idNumber: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        address: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        dateOfBirth: {
            type: DataTypes.DATEONLY,
            allowNull: false,
        },
        portraitImage: {
            type: DataTypes.STRING,
            allowNull: false,
        },

    },
    {
        sequelize,
        modelName: 'User',
        tableName: 'Users',
    }
);

export default User;
