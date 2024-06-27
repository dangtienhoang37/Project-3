import { Router } from 'express';
import AccountController from './accountController';
import { asyncHandler } from '../../common/helper/asyncHandler';





const accountRouter = Router();
const accountController = new AccountController();
accountRouter.route("/login").post(asyncHandler(accountController.login));
// register phai verify email
accountRouter.route("/register").post(asyncHandler(accountController.signUp));
accountRouter.route("/logout").post();
accountRouter.route("/profile").get();
accountRouter.route("/profile/update-avatar").post();
accountRouter.route("/profile/update-password").post();


export default accountRouter;