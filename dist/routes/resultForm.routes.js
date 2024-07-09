"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
//Importing all the controller functions
const resultForm_controller_1 = require("../controllers/resultForm.controller");
//Importing all the middlewares
const schemaValidation_middleware_1 = require("../middlewares/schemaValidation.middleware");
const auth_middleware_1 = require("../middlewares/auth.middleware");
const roleChecker_middleware_1 = require("../middlewares/roleChecker.middleware");
//Importing all the schemas for validations
const resultForm_schema_1 = require("../schemas/resultForm.schema");
//Defining Router Object
const router = (0, express_1.Router)();
//Authenticated + Authorized Routes
router.route('/create').post(auth_middleware_1.verifyJWT, (0, roleChecker_middleware_1.checkRoles)(['Admin']), (0, schemaValidation_middleware_1.validateData)(resultForm_schema_1.createResultFormSchema), resultForm_controller_1.createNewResultForm);
router.route('/update').patch(auth_middleware_1.verifyJWT, (0, roleChecker_middleware_1.checkRoles)(['Admin']), resultForm_controller_1.updateResultForm);
router.route('/delete').delete(auth_middleware_1.verifyJWT, (0, roleChecker_middleware_1.checkRoles)(['Admin']), resultForm_controller_1.deleteResultForm);
router.route('/all-result-forms').get(auth_middleware_1.verifyJWT, (0, roleChecker_middleware_1.checkRoles)(['Admin', 'User']), resultForm_controller_1.getAllResultForm);
exports.default = router;
