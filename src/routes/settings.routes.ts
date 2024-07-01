import { Router } from "express";

//Importing all the controller functions
import {
    createNewSetting,
    updateSettings,
    getAllSettings,
    searchSetting
} from "../controllers/setting.controller";

//Importing all the middlewares
import { validateData } from "../middlewares/schemaValidation.middleware";
import { verifyJWT } from "../middlewares/auth.middleware";
import { checkRoles } from "../middlewares/roleChecker.middleware";

//Importing all the schemas for validations
import { createSettingSchema } from "../schemas/setting.schema";

//Defining Router Object
const router = Router();

//Authenticated + Authorized Routes
router.route('/create').post(verifyJWT, checkRoles(['Admin']), validateData(createSettingSchema), createNewSetting);
router.route('/update').patch(verifyJWT, checkRoles(['Admin']), updateSettings);
router.route('/search').get(verifyJWT, checkRoles(['Admin']), searchSetting);
router.route('/all-settings').get(verifyJWT, checkRoles(['Admin', 'User']), getAllSettings);

export default router;