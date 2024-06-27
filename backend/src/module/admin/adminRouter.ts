import { Router } from "express";



const adminRouter = Router();
// staff
adminRouter.route("/getAllStaff").post();
adminRouter.route("/findStaff").post();
adminRouter.route("/staffProfile").get();
adminRouter.route("/registerStaff").post();
adminRouter.route("/delStaff").post();
adminRouter.route("/updateInforStaff").patch();



export default adminRouter;