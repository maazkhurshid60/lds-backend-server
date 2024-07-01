import { Router } from "express";

//Importing all the controller functions
import {
    createNewServiceForm,
    updateServiceForm,
    deleteServiceForm,
    getAllServiceForm
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
router.route('/create').post(verifyJWT, checkRoles(['Admin']), validateData(createServiceFormSchema), createNewServiceForm);
router.route('/update').patch(verifyJWT, checkRoles(['Admin']), updateServiceForm);
router.route('/delete').delete(verifyJWT, checkRoles(['Admin']), deleteServiceForm);
router.route('/all-service-forms').get(verifyJWT, checkRoles(['Admin', 'User']), getAllServiceForm);

export default router;