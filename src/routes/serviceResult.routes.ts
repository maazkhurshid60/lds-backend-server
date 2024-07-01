import { Router } from "express";

//Importing all the controller functions
import {
    createServiceResult,
    updateServiceResult,
    deleteServiceResult,
    getAllServiceResults,
    searchServiceResult
} from "../controllers/serviceResult.controller";

//Importing all the middlewares
import { validateData } from "../middlewares/schemaValidation.middleware";
import { verifyJWT } from "../middlewares/auth.middleware";
import { checkRoles } from "../middlewares/roleChecker.middleware";

//Importing all the schemas for validations
import { createServiceResultSchema } from "../schemas/serviceResult.schema";

//Defining Router Object
const router = Router();

//Authenticated + Authorized Routes
router.route('/create').post(verifyJWT, checkRoles(['Admin']), validateData(createServiceResultSchema), createServiceResult);
router.route('/delete').delete(verifyJWT, checkRoles(['Admin']), deleteServiceResult);
router.route('/update').patch(verifyJWT, checkRoles(['Admin']), updateServiceResult);
router.route('/search').get(verifyJWT, checkRoles(['Admin', 'User']), searchServiceResult);
router.route('/all-service-results').get(verifyJWT, checkRoles(['Admin', 'User']), getAllServiceResults);


export default router;