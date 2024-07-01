import { Router } from "express";

//Importing all the controller functions
import {
    createNewStandardServiceType,
    updateStandardServiceType,
    deleteStandardServiceType,
    getAllStandardServiceType,
    searchStandardServiceType
} from "../controllers/standardServiceType.controller";

//Importing all the middlewares
import { validateData } from "../middlewares/schemaValidation.middleware";
import { verifyJWT } from "../middlewares/auth.middleware";
import { checkRoles } from "../middlewares/roleChecker.middleware";

//Importing all the schemas for validations
import { createStandardServiceTypechema } from "../schemas/standardServiceType.schema";

//Defining Router Object
const router = Router();

//Authenticated + Authorized Routes
router.route('/create').post(verifyJWT, checkRoles(['Admin']), validateData(createStandardServiceTypechema), createNewStandardServiceType);
router.route('/update').patch(verifyJWT, checkRoles(['Admin']), updateStandardServiceType);
router.route('/delete').delete(verifyJWT, checkRoles(['Admin']), deleteStandardServiceType);
router.route('/search').get(verifyJWT, checkRoles(['Admin', 'User']), searchStandardServiceType);
router.route('/all-standard-service-types').get(verifyJWT, checkRoles(['Admin', 'User']), getAllStandardServiceType);

export default router;