import { Router } from "express";

//Importing all the controller functions
import {
    createNewClient,
    updateClient,
    deleteClient,
    getAllClients,
    searchClient
} from "../controllers/client.controller";

//Importing all the middlewares
import { validateData } from "../middlewares/schemaValidation.middleware";
import { verifyJWT } from "../middlewares/auth.middleware";
import { checkRoles } from "../middlewares/roleChecker.middleware";

//Importing all the schemas for validations
import { createClientSchema } from "../schemas/client.schema";

//Defining Router Object
const router = Router();

//Authenticated + Authorized Routes
router.route('/create').post(verifyJWT, checkRoles(['Admin']), validateData(createClientSchema), createNewClient);
router.route('/update').patch(verifyJWT, checkRoles(['Admin']), updateClient);
router.route('/delete').delete(verifyJWT, checkRoles(['Admin']), deleteClient);
router.route('/search').get(verifyJWT, checkRoles(['Admin']), searchClient);
router.route('/all-clients').get(verifyJWT, checkRoles(['Admin', 'User']), getAllClients);

export default router;