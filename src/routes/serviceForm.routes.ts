import { Router } from "express";

//Importing all the controller functions
import {
    createNewServiceForm,
    updateServiceForm,
    deleteServiceForm,
    getAllServiceForm,
    getDateRangeServiceForms
} from "../controllers/serviceForm.controller";

//Importing all the middlewares
import { validateData } from "../middlewares/schemaValidation.middleware";
import { verifyJWT } from "../middlewares/auth.middleware";
import { checkRoles } from "../middlewares/roleChecker.middleware";

//Importing all the schemas for validations
import { createServiceFormSchema } from "../schemas/serviceForm.schema";

//Defining Router Object
const router = Router();

//Authenticated + Authorized Routes
router.route('/create').post(verifyJWT, checkRoles(['Admin', 'User']), validateData(createServiceFormSchema), createNewServiceForm);
router.route('/update').patch(verifyJWT, checkRoles(['Admin', 'User']), updateServiceForm);
router.route('/delete').delete(verifyJWT, checkRoles(['Admin','User']), deleteServiceForm);
router.route('/all-service-forms').get(verifyJWT, checkRoles(['Admin', 'User']), getAllServiceForm);
router.route('/all-service-forms-range').get(verifyJWT, checkRoles(['Admin', 'User']), getDateRangeServiceForms);

export default router;