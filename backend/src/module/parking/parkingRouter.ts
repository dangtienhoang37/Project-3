import { Router } from "express";



const parkingRouter = Router();





// can middleware thi dat o duoi dong nay

parkingRouter.route("/parking-current/:id").get();
// lich su cua bai: voi staff khi login-> lay id tu header
parkingRouter.route("/week-parking-history/:id").get();
parkingRouter.route("/day-parking-history/:id").get();
parkingRouter.route("/month-parking-history/:id").get();
parkingRouter.route("/find-parking-history/:id").post();
parkingRouter.route("/detail-parking-history/:id").get();

// lich su cua khach hang
parkingRouter.route("/user-parking-history/:id")
// doanh thu
parkingRouter.route("/day-revenue-parking-history/:id").get();
parkingRouter.route("/week-revenue-parking-history/:id").get();
parkingRouter.route("/month-revenue-parking-history/:id").get();












