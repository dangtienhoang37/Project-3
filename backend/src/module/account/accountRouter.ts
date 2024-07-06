import { Router } from 'express';
import AccountController from './accountController';
import { asyncHandler } from '../../common/helper/asyncHandler';
import { authenticaton } from '../../common/auth/auth.util';





const accountRouter = Router();
const accountController = new AccountController();
accountRouter.route("/login").post(asyncHandler(accountController.login)); //done
// register phai verify email
accountRouter.route("/register").post(asyncHandler(accountController.signUp)); //done
accountRouter.use(authenticaton)
accountRouter.route("/logout").post(asyncHandler(accountController.logout)); //done
accountRouter.route("/profile").get(asyncHandler(accountController.getProfile));//done
accountRouter.route("/profile/update-avatar").patch(asyncHandler(accountController.updateAvatar));
accountRouter.route("/profile/update-password").patch(asyncHandler(accountController.updatePassword));// done
accountRouter.route("/profile/forgot-password").patch();



export default accountRouter;