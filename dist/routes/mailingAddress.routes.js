"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
//Importing all the controller functions
const mailingAddress_controller_1 = require("../controllers/mailingAddress.controller");
//Importing all the middlewares
const schemaValidation_middleware_1 = require("../middlewares/schemaValidation.middleware");
const auth_middleware_1 = require("../middlewares/auth.middleware");
const roleChecker_middleware_1 = require("../middlewares/roleChecker.middleware");
//Importing all the schemas for validations
const mailingAddress_schema_1 = require("../schemas/mailingAddress.schema");
//Defining Router Object
const router = (0, express_1.Router)();
//Authenticated + Authorized Routes
router.route('/create').post(auth_middleware_1.verifyJWT, (0, roleChecker_middleware_1.checkRoles)(['Admin']), (0, schemaValidation_middleware_1.validateData)(mailingAddress_schema_1.createMailingAddressSchema), mailingAddress_controller_1.createNewMailingAddress);
router.route('/update').patch(auth_middleware_1.verifyJWT, (0, roleChecker_middleware_1.checkRoles)(['Admin']), mailingAddress_controller_1.updateMailingAddress);
router.route('/delete').delete(auth_middleware_1.verifyJWT, (0, roleChecker_middleware_1.checkRoles)(['Admin']), mailingAddress_controller_1.deleteMailingAddress);
router.route('/search').get(auth_middleware_1.verifyJWT, (0, roleChecker_middleware_1.checkRoles)(['Admin', 'User']), mailingAddress_controller_1.searchMailingAddress);
router.route('/all-mailing-address').get(auth_middleware_1.verifyJWT, (0, roleChecker_middleware_1.checkRoles)(['Admin', 'User']), mailingAddress_controller_1.getAllMailingAddress);
exports.default = router;
