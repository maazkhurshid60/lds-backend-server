import { Router } from "express";

//Importing all the controller functions
import {
    createRole,
    updateRole,
    deleteRole,
    getAllAvailableRoles,
    searchRole
} from "../controllers/role.controller";

//Importing all the middlewares
import { validateData } from "../middlewares/schemaValidation.middleware";
import { verifyJWT } from "../middlewares/auth.middleware";
import { checkRoles } from "../middlewares/roleChecker.middleware";

//Importing all the schemas for validations
import { createRoleSchema } from "../schemas/role.schema";

//Defining Router Object
const router = Router();

//Authenticated + Authorized Routes
router.route('/create').post(validateData(createRoleSchema), createRole);
router.route('/update').patch(verifyJWT, checkRoles(['Admin']), validateData(createRoleSchema), updateRole);
router.route('/delete').delete(verifyJWT, checkRoles(['Admin']), deleteRole);
router.route('/search').get(verifyJWT, checkRoles(['Admin', 'User']), searchRole);
router.route('/all-roles').get(verifyJWT, checkRoles(['Admin', 'User']), getAllAvailableRoles);

export default router;