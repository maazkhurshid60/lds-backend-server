import { Router } from "express";

//Importing all the controller functions
import {
    createServiceType,
    updateServiceType,
    deleteServiceType,
    getAllServiceTypes,
    searchServiceType
} from "../controllers/serviceType.controller";

//Importing all the middlewares
import { validateData } from "../middlewares/schemaValidation.middleware";
import { verifyJWT } from "../middlewares/auth.middleware";
import { checkRoles } from "../middlewares/roleChecker.middleware";

//Importing all the schemas for validations
import { createServiceTypeSchema } from "../schemas/serviceType.schema";

//Defining Router Object
const router = Router();

//Authenticated + Authorized Routes
router.route('/create').post(verifyJWT, checkRoles(['Admin']), validateData(createServiceTypeSchema), createServiceType);
router.route('/delete').delete(verifyJWT, checkRoles(['Admin']), deleteServiceType);
router.route('/update').patch(verifyJWT, checkRoles(['Admin']), updateServiceType);
router.route('/search').get(verifyJWT, checkRoles(['Admin', 'User']), searchServiceType);
router.route('/all-service-types').get(verifyJWT, checkRoles(['Admin', 'User']), getAllServiceTypes);


export default router;