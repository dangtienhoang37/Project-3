import { Router } from "express";

import accountRouter from "../module/account/accountRouter";
import { apiKey, permission } from "../common/auth/checkAuth";
import adminRouter from "../module/admin/adminRouter";

const router = Router();
// check Apikey
// router.use(apiKey);
//check permission
// router.use(permission('user'));


router.use('/auth', accountRouter);
router.use('/admin',adminRouter);
// router.use('/staff');
// router.use('/customer');

export default router