import { Router } from "express";

//Importing all the controller functions
import {
    search
} from "../controllers/legalDelivery.controller";

//Importing all the middlewares
import { verifyJWT } from "../middlewares/auth.middleware";
import { checkRoles } from "../middlewares/roleChecker.middleware";

//Defining Router Object
const router = Router();

//Authenticated + Authorized Routes
router.route('/search').get(search);

export default router;