"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
//Importing all the controller functions
const holiday_controller_1 = require("../controllers/holiday.controller");
//Importing all the middlewares
const schemaValidation_middleware_1 = require("../middlewares/schemaValidation.middleware");
const auth_middleware_1 = require("../middlewares/auth.middleware");
const roleChecker_middleware_1 = require("../middlewares/roleChecker.middleware");
//Importing all the schemas for validations
const holiday_schema_1 = require("../schemas/holiday.schema");
//Defining Router Object
const router = (0, express_1.Router)();
//Authenticated + Authorized Routes
router.route('/create').post(auth_middleware_1.verifyJWT, (0, roleChecker_middleware_1.checkRoles)(['Admin']), (0, schemaValidation_middleware_1.validateData)(holiday_schema_1.createHolidaySchema), holiday_controller_1.createNewHoliday);
router.route('/update').patch(auth_middleware_1.verifyJWT, (0, roleChecker_middleware_1.checkRoles)(['Admin']), holiday_controller_1.updateHoliday);
router.route('/delete').delete(auth_middleware_1.verifyJWT, (0, roleChecker_middleware_1.checkRoles)(['Admin']), holiday_controller_1.deleteHoliday);
router.route('/search').get(auth_middleware_1.verifyJWT, (0, roleChecker_middleware_1.checkRoles)(['Admin', 'User']), holiday_controller_1.searchHoliday);
router.route('/all-holidays').get(auth_middleware_1.verifyJWT, (0, roleChecker_middleware_1.checkRoles)(['Admin', 'User']), holiday_controller_1.getAllHolidays);
exports.default = router;
