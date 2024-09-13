"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
//Importing all the controller functions
const serviceForm_controller_1 = require("../controllers/serviceForm.controller");
//Importing all the middlewares
const schemaValidation_middleware_1 = require("../middlewares/schemaValidation.middleware");
const auth_middleware_1 = require("../middlewares/auth.middleware");
const roleChecker_middleware_1 = require("../middlewares/roleChecker.middleware");
//Importing all the schemas for validations
const serviceForm_schema_1 = require("../schemas/serviceForm.schema");
//Defining Router Object
const router = (0, express_1.Router)();
//Authenticated + Authorized Routes
router.route('/create').post(auth_middleware_1.verifyJWT, (0, roleChecker_middleware_1.checkRoles)(['Admin', 'User']), (0, schemaValidation_middleware_1.validateData)(serviceForm_schema_1.createServiceFormSchema), serviceForm_controller_1.createNewServiceForm);
router.route('/update').patch(auth_middleware_1.verifyJWT, (0, roleChecker_middleware_1.checkRoles)(['Admin', 'User']), serviceForm_controller_1.updateServiceForm);
router.route('/delete').delete(auth_middleware_1.verifyJWT, (0, roleChecker_middleware_1.checkRoles)(['Admin', 'User']), serviceForm_controller_1.deleteServiceForm);
router.route('/all-service-forms').get(auth_middleware_1.verifyJWT, (0, roleChecker_middleware_1.checkRoles)(['Admin', 'User']), serviceForm_controller_1.getAllServiceForm);
router.route('/all-service-forms-range').post(auth_middleware_1.verifyJWT, (0, roleChecker_middleware_1.checkRoles)(['Admin', 'User']), serviceForm_controller_1.getDateRangeServiceForms);
exports.default = router;
