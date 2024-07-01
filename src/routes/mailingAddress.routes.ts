import { Router } from "express";

//Importing all the controller functions
import {
    createNewMailingAddress,
    updateMailingAddress,
    deleteMailingAddress,
    getAllMailingAddress,
    searchMailingAddress
} from "../controllers/mailingAddress.controller";

//Importing all the middlewares
import { validateData } from "../middlewares/schemaValidation.middleware";
import { verifyJWT } from "../middlewares/auth.middleware";
import { checkRoles } from "../middlewares/roleChecker.middleware";

//Importing all the schemas for validations
import { createMailingAddressSchema } from "../schemas/mailingAddress.schema";

//Defining Router Object
const router = Router();

//Authenticated + Authorized Routes
router.route('/create').post(verifyJWT, checkRoles(['Admin']), validateData(createMailingAddressSchema), createNewMailingAddress);
router.route('/update').patch(verifyJWT, checkRoles(['Admin']), updateMailingAddress);
router.route('/delete').delete(verifyJWT, checkRoles(['Admin']), deleteMailingAddress);
router.route('/search').get(verifyJWT, checkRoles(['Admin', 'User']), searchMailingAddress);
router.route('/all-mailing-address').get(verifyJWT, checkRoles(['Admin', 'User']), getAllMailingAddress);

export default router;