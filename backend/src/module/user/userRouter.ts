import { Router } from "express";
import userController from "./userController";
import { asyncHandler } from "../../common/helper/asyncHandler";


const userRouter = Router();
const _userController = new userController();


userRouter.route("/booking").post(asyncHandler(_userController.booking));
userRouter.route("/list-booking").post(asyncHandler(_userController.listBooking));
userRouter.route("/detail-booking/:id").post(asyncHandler(_userController.detailBooking));

// checkin
userRouter.route("/checkin").post(asyncHandler(_userController.checkin))

userRouter.route("/list-history").post(asyncHandler(_userController.listHistory));
userRouter.route("/detail-history/:id").post(asyncHandler(_userController.detailHistory));
userRouter.route("/find-history").post(asyncHandler(_userController.findHistory));


//khach checkout khoi bai
userRouter.route("/user-checkout").post(asyncHandler(_userController.checkout));
//
