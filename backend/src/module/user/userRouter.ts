import { Router } from "express";


const userRouter = Router();


userRouter.route("/booking").post();
userRouter.route("/list-booking").post();
userRouter.route("/detail-booking/:id").post();

userRouter.route("/list-history").post();
userRouter.route("/detail-history/:id").post();
userRouter.route("/find-history").post();


//khach checkout khoi bai
userRouter.route("/user-checkout").post();
//
