import { Router } from "express";

//Importing all the controller functions
import {
    createNewResultForm,
    updateResultForm,
    deleteResultForm,
    getAllResultForm,
    searchInResult
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
router.route('/create').post(verifyJWT, checkRoles(['Admin', 'User']), validateData(createResultFormSchema), createNewResultForm);
router.route('/update').patch(verifyJWT, checkRoles(['Admin', 'User']), updateResultForm);
router.route('/delete').delete(verifyJWT, checkRoles(['Admin', 'User']), deleteResultForm);
router.route('/all-result-forms').get(verifyJWT, checkRoles(['Admin', 'User']), getAllResultForm);
router.route('/search-result-forms').post(verifyJWT, checkRoles(['Admin', 'User']), searchInResult);


export default router;