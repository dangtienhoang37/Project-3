import { Router } from "express";
import AdminController from "./admin.controller";
import { asyncHandler } from "../../common/helper/asyncHandler";



const adminRouter = Router();
const adminController = new AdminController();
// staff
// phai check neu la admin=> them middleware
adminRouter.route("/get-all-staff").get(asyncHandler(adminController.getAllStaff));// done
adminRouter.route("/find-staff/:id").get(); 
adminRouter.route("/staff-profile/:id").get(asyncHandler(adminController.staffProfile));//done
adminRouter.route("/registerStaff").post();
adminRouter.route("/delStaff").post();
adminRouter.route("/updateInforStaff").patch();



export default adminRouter;