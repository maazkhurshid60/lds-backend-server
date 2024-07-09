"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
//Importing all the controller functions
const client_controller_1 = require("../controllers/client.controller");
//Importing all the middlewares
const schemaValidation_middleware_1 = require("../middlewares/schemaValidation.middleware");
const auth_middleware_1 = require("../middlewares/auth.middleware");
const roleChecker_middleware_1 = require("../middlewares/roleChecker.middleware");
//Importing all the schemas for validations
const client_schema_1 = require("../schemas/client.schema");
//Defining Router Object
const router = (0, express_1.Router)();
//Authenticated + Authorized Routes
router.route('/create').post(auth_middleware_1.verifyJWT, (0, roleChecker_middleware_1.checkRoles)(['Admin']), (0, schemaValidation_middleware_1.validateData)(client_schema_1.createClientSchema), client_controller_1.createNewClient);
router.route('/update').patch(auth_middleware_1.verifyJWT, (0, roleChecker_middleware_1.checkRoles)(['Admin']), client_controller_1.updateClient);
router.route('/delete').delete(auth_middleware_1.verifyJWT, (0, roleChecker_middleware_1.checkRoles)(['Admin']), client_controller_1.deleteClient);
router.route('/search').get(auth_middleware_1.verifyJWT, (0, roleChecker_middleware_1.checkRoles)(['Admin']), client_controller_1.searchClient);
router.route('/all-clients').get(auth_middleware_1.verifyJWT, (0, roleChecker_middleware_1.checkRoles)(['Admin', 'User']), client_controller_1.getAllClients);
exports.default = router;
