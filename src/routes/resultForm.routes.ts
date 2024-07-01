import { Router } from "express";

//Importing all the controller functions
import {
    createNewResultForm,
    updateResultForm,
    deleteResultForm,
    getAllResultForm
} from "../controllers/resultForm.controller";

//Importing all the middlewares
import { validateData } from "../middlewares/schemaValidation.middleware";
import { verifyJWT } from "../middlewares/auth.middleware";
import { checkRoles } from "../middlewares/roleChecker.middleware";

//Importing all the schemas for validations
import { createResultFormSchema } from "../schemas/resultForm.schema";

//Defining Router Object
const router = Router();

//Authenticated + Authorized Routes
router.route('/create').post(verifyJWT, checkRoles(['Admin']), validateData(createResultFormSchema), createNewResultForm);
router.route('/update').patch(verifyJWT, checkRoles(['Admin']), updateResultForm);
router.route('/delete').delete(verifyJWT, checkRoles(['Admin']), deleteResultForm);
router.route('/all-result-forms').get(verifyJWT, checkRoles(['Admin', 'User']), getAllResultForm);

export default router;