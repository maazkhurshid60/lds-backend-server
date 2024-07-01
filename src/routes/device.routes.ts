import { Router } from "express";

//Importing all the controller functions
import {
    createNewDevice,
    updateDevice,
    deleteDevice,
    getAllDevices,
    searchDevice
} from "../controllers/device.controller";

//Importing all the middlewares
import { validateData } from "../middlewares/schemaValidation.middleware";
import { verifyJWT } from "../middlewares/auth.middleware";
import { checkRoles } from "../middlewares/roleChecker.middleware";

//Importing all the schemas for validations
import { createDeviceSchema } from "../schemas/device.schema";

//Defining Router Object
const router = Router();

//Authenticated + Authorized Routes
router.route('/create').post(verifyJWT, checkRoles(['Admin']), validateData(createDeviceSchema), createNewDevice);
router.route('/update').patch(verifyJWT, checkRoles(['Admin']), updateDevice);
router.route('/delete').delete(verifyJWT, checkRoles(['Admin']), deleteDevice);
router.route('/all-devices').get(verifyJWT, checkRoles(['Admin', 'User']), getAllDevices);
router.route('/search').get(verifyJWT, checkRoles(['Admin', 'User']), searchDevice);

export default router;