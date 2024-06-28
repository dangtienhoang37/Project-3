
import multer from 'multer'
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'uploads/'); // Đường dẫn lưu trữ tệp
    },
    filename: (req, file, cb) => {
      cb(null, `${Date.now()}-${file.originalname}`); // Tên tệp được lưu trữ
    },
  });