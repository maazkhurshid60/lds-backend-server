"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
//Importing all the controller functions
const legalDelivery_controller_1 = require("../controllers/legalDelivery.controller");
//Defining Router Object
const router = (0, express_1.Router)();
//Authenticated + Authorized Routes
router.route('/search').post(legalDelivery_controller_1.search);
exports.default = router;
