"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
//Importing all the controller functions
const serverDown_controller_1 = require("../controllers/serverDown.controller");
//Defining Router Object
const router = (0, express_1.Router)();
//Authenticated + Authorized Routes
router.route('/create').post(serverDown_controller_1.setServerApi);
router.route('/update').patch(serverDown_controller_1.updateServerApi);
router.route('/getall').get(serverDown_controller_1.getAllServerStateApi);
exports.default = router;
