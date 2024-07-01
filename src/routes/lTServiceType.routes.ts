import { Router } from "express";

//Importing all the controller functions
import {
    createNewLTServiceType,
    updateLTServiceType,
    deleteLTServiceType,
    getAllLTServiceType,
    searchLTSerivceType
} from "../controllers/lTServiceType.controller";

//Importing all the middlewares
import { validateData } from "../middlewares/schemaValidation.middleware";
import { verifyJWT } from "../middlewares/auth.middleware";
import { checkRoles } from "../middlewares/roleChecker.middleware";

//Importing all the schemas for validations
import { createLTServiceTypeSchema } from "../schemas/lTServiceType.schema";

//Defining Router Object
const router = Router();

//Authenticated + Authorized Routes
router.route('/create').post(verifyJWT, checkRoles(['Admin']), validateData(createLTServiceTypeSchema), createNewLTServiceType);
router.route('/update').patch(verifyJWT, checkRoles(['Admin']), updateLTServiceType);
router.route('/delete').delete(verifyJWT, checkRoles(['Admin']), deleteLTServiceType);
router.route('/search').get(verifyJWT, checkRoles(['Admin', 'User']), searchLTSerivceType);
router.route('/all-lT-service-types').get(verifyJWT, checkRoles(['Admin', 'User']), getAllLTServiceType);

export default router;