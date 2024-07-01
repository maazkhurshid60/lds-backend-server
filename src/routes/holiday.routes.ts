import { Router } from "express";

//Importing all the controller functions
import {
    createNewHoliday,
    updateHoliday,
    deleteHoliday,
    getAllHolidays,
    searchHoliday
} from "../controllers/holiday.controller";

//Importing all the middlewares
import { validateData } from "../middlewares/schemaValidation.middleware";
import { verifyJWT } from "../middlewares/auth.middleware";
import { checkRoles } from "../middlewares/roleChecker.middleware";

//Importing all the schemas for validations
import { createHolidaySchema } from "../schemas/holiday.schema";

//Defining Router Object
const router = Router();

//Authenticated + Authorized Routes
router.route('/create').post(verifyJWT, checkRoles(['Admin']), validateData(createHolidaySchema), createNewHoliday);
router.route('/update').patch(verifyJWT, checkRoles(['Admin']), updateHoliday);
router.route('/delete').delete(verifyJWT, checkRoles(['Admin']), deleteHoliday);
router.route('/search').get(verifyJWT, checkRoles(['Admin', 'User']), searchHoliday);
router.route('/all-holidays').get(verifyJWT, checkRoles(['Admin', 'User']), getAllHolidays);

export default router;