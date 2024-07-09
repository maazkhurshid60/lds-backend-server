"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
//Importing all the controller functions
const user_controller_1 = require("../controllers/user.controller");
//Importing all the middlewares
const schemaValidation_middleware_1 = require("../middlewares/schemaValidation.middleware");
const auth_middleware_1 = require("../middlewares/auth.middleware");
const roleChecker_middleware_1 = require("../middlewares/roleChecker.middleware");
//Importing all the schemas for validations
const user_schema_1 = require("../schemas/user.schema");
//Defining Router Object
const router = (0, express_1.Router)();
//Health Check Route
router.route('/health').get(user_controller_1.healthCheck);
//Open Routes
router.route('/register').post((0, schemaValidation_middleware_1.validateData)(user_schema_1.userRegistrationSchema), user_controller_1.registerNewUser);
router.route('/login').post((0, schemaValidation_middleware_1.validateData)(user_schema_1.userLoginSchema), user_controller_1.loginUser);
//Authenticated + Authorized Routes
router.route('/logout').get(auth_middleware_1.verifyJWT, (0, roleChecker_middleware_1.checkRoles)(["Admin", "User"]), user_controller_1.logoutUser);
router.route('/update').patch(auth_middleware_1.verifyJWT, (0, roleChecker_middleware_1.checkRoles)(['Admin']), user_controller_1.updateUserDetails);
router.route('/delete-user').delete(auth_middleware_1.verifyJWT, (0, roleChecker_middleware_1.checkRoles)(['Admin']), user_controller_1.deleteUser);
router.route('/get-current-user').get(auth_middleware_1.verifyJWT, (0, roleChecker_middleware_1.checkRoles)(['Admin', 'User']), user_controller_1.getCurrentUser);
router.route('/get-any-user-details').get(auth_middleware_1.verifyJWT, (0, roleChecker_middleware_1.checkRoles)(['Admin', 'User']), user_controller_1.getAnyUserDetails);
router.route('/update-user-roles').patch(auth_middleware_1.verifyJWT, (0, roleChecker_middleware_1.checkRoles)(['Admin']), user_controller_1.updateUserRoles);
router.route('/search').get(auth_middleware_1.verifyJWT, (0, roleChecker_middleware_1.checkRoles)(['Admin', 'User']), user_controller_1.searchUser);
router.route('/all-users').get(auth_middleware_1.verifyJWT, (0, roleChecker_middleware_1.checkRoles)(['Admin', 'User']), user_controller_1.getAllCreatedUsers);
exports.default = router;
