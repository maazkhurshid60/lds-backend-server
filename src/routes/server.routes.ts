import { Router } from "express";

//Importing all the controller functions
import {
    createNewServer,
    updateServer,
    deleteServer,
    getAllServers,
    searchServer
} from "../controllers/server.controller";

//Importing all the middlewares
import { validateData } from "../middlewares/schemaValidation.middleware";
import { verifyJWT } from "../middlewares/auth.middleware";
import { checkRoles } from "../middlewares/roleChecker.middleware";

//Importing all the schemas for validations
import { createServerSchema } from "../schemas/server.schema";

//Defining Router Object
const router = Router();

//Authenticated + Authorized Routes
router.route('/create').post(verifyJWT, checkRoles(['Admin']), validateData(createServerSchema), createNewServer);
router.route('/update').patch(verifyJWT, checkRoles(['Admin']), updateServer);
router.route('/delete').delete(verifyJWT, checkRoles(['Admin']), deleteServer);
router.route('/search').get(verifyJWT, checkRoles(['Admin', 'User']), searchServer);
router.route('/all-servers').get(verifyJWT, checkRoles(['Admin', 'User']), getAllServers);

export default router;