"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
//Importing all the controller functions
const standardServiceType_controller_1 = require("../controllers/standardServiceType.controller");
//Importing all the middlewares
const schemaValidation_middleware_1 = require("../middlewares/schemaValidation.middleware");
const auth_middleware_1 = require("../middlewares/auth.middleware");
const roleChecker_middleware_1 = require("../middlewares/roleChecker.middleware");
//Importing all the schemas for validations
const standardServiceType_schema_1 = require("../schemas/standardServiceType.schema");
//Defining Router Object
const router = (0, express_1.Router)();
//Authenticated + Authorized Routes
router.route('/create').post(auth_middleware_1.verifyJWT, (0, roleChecker_middleware_1.checkRoles)(['Admin']), (0, schemaValidation_middleware_1.validateData)(standardServiceType_schema_1.createStandardServiceTypechema), standardServiceType_controller_1.createNewStandardServiceType);
router.route('/update').patch(auth_middleware_1.verifyJWT, (0, roleChecker_middleware_1.checkRoles)(['Admin']), standardServiceType_controller_1.updateStandardServiceType);
router.route('/delete').delete(auth_middleware_1.verifyJWT, (0, roleChecker_middleware_1.checkRoles)(['Admin']), standardServiceType_controller_1.deleteStandardServiceType);
router.route('/search').get(auth_middleware_1.verifyJWT, (0, roleChecker_middleware_1.checkRoles)(['Admin', 'User']), standardServiceType_controller_1.searchStandardServiceType);
router.route('/all-standard-service-types').get(auth_middleware_1.verifyJWT, (0, roleChecker_middleware_1.checkRoles)(['Admin', 'User']), standardServiceType_controller_1.getAllStandardServiceType);
exports.default = router;
