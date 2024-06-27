// dbInit.ts
import Vehicle from '../module/Vehicle/vehicle.schema';
import Account from '../module/account/account.schema';
import ApiKey from '../module/apikey/apikey.chema';
import Area from '../module/area/area.schema';
import BookingSchedule from '../module/bookingSchedule/booking.schema';
import Invoice from '../module/invoice/invoice.schema';
import ParkingLot from '../module/parking/parkingLot/parkinglot.schema';
import ParkingSpot from '../module/parking/parkingSpot/parkingSpot.schema';
import Rate from '../module/rate/rate.schema';
import User from '../module/user/user.schema';

// Mảng các model
const models = [User, Account, ParkingLot, Vehicle, Area, BookingSchedule, Rate, Invoice, ParkingSpot, ApiKey];

// Khởi tạo các bảng chưa tồn tại vào cơ sở dữ liệu
export const initDatabase = async () => {
    try {
        // Lặp qua mảng models để kiểm tra và khởi tạo các bảng chưa tồn tại
        for (const Model of models) {
            if (!(await Model.sync({ force: false }))) {
                await Model.sync();
                console.log(`${Model.name} table has been synchronized successfully.`);
            }
        }

        console.log('Database initialization completed.');
    } catch (error) {
        console.error('Error initializing database:', error);
    }
}


