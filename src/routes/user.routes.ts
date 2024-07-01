import { Router } from "express";

//Importing all the controller functions
import {
    registerNewUser,
    loginUser,
    logoutUser,
    updateUserDetails,
    deleteUser,
    getAnyUserDetails,
    getCurrentUser,
    updateUserRoles,
    getAllCreatedUsers,
    searchUser
} from "../controllers/user.controller";

//Importing all the middlewares
import { validateData } from "../middlewares/schemaValidation.middleware";
import { verifyJWT } from "../middlewares/auth.middleware";
import { checkRoles } from "../middlewares/roleChecker.middleware"

//Importing all the schemas for validations
import { userRegistrationSchema, userLoginSchema } from "../schemas/user.schema";

//Defining Router Object
const router = Router();

//Open Routes
router.route('/register').post(validateData(userRegistrationSchema), registerNewUser);
router.route('/login').post(validateData(userLoginSchema), loginUser);

//Authenticated + Authorized Routes
router.route('/logout').get( verifyJWT, checkRoles(["Admin", "User"]), logoutUser);
router.route('/update').patch( verifyJWT, checkRoles(['Admin']), updateUserDetails);
router.route('/delete-user').delete( verifyJWT, checkRoles(['Admin']), deleteUser);
router.route('/get-current-user').get( verifyJWT, checkRoles(['Admin', 'User']), getCurrentUser);
router.route('/get-any-user-details').get( verifyJWT, checkRoles(['Admin', 'User']), getAnyUserDetails);
router.route('/update-user-roles').patch( verifyJWT, checkRoles(['Admin']), updateUserRoles);
router.route('/search').get( verifyJWT, checkRoles(['Admin', 'User']), searchUser);
router.route('/all-users').get( verifyJWT, checkRoles(['Admin', 'User']), getAllCreatedUsers);

export default router;