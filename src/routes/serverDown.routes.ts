import { Router } from "express";

//Importing all the controller functions
import {
    getAllServerStateApi,
    setServerApi,
    updateServerApi
} from "../controllers/serverDown.controller";



//Defining Router Object
const router = Router();

//Authenticated + Authorized Routes
router.route('/create').post(setServerApi);
router.route('/update').patch(updateServerApi);
router.route('/getall').get(getAllServerStateApi);




export default router;