"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const express_1 = __importStar(require("express"));
const cors_1 = __importDefault(require("cors"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const Constants_1 = require("./utils/Constants");
const app = (0, express_1.default)();
exports.app = app;
let serverDown = false; // Flag to track whether the server should be down
// Apply CORS policy
app.use((0, cors_1.default)({
    origin: ['https://gesilds.com', 'http://localhost:5173'],
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Add all allowed methods
    allowedHeaders: ['Content-Type', 'Authorization'], // Include any headers that are expected in requests
}));
// Middleware to check if the server is down
app.use((req, res, next) => {
    if (serverDown && req.originalUrl !== `${Constants_1.baseURL}/internal-server`) {
        return res.status(503).send('Server is temporarily down'); // Block access to all routes except /server/control
    }
    next(); // Proceed to the next middleware if the server is up
});
// Middlewares
app.use(express_1.default.json({ limit: "20kb" }));
app.use(express_1.default.urlencoded({ extended: true, limit: "20kb" }));
app.use((0, cookie_parser_1.default)());
// Import Routes
const user_routes_1 = __importDefault(require("./routes/user.routes"));
const role_routes_1 = __importDefault(require("./routes/role.routes"));
const serviceResult_routes_1 = __importDefault(require("./routes/serviceResult.routes"));
const serviceType_routes_1 = __importDefault(require("./routes/serviceType.routes"));
const server_routes_1 = __importDefault(require("./routes/server.routes"));
const device_routes_1 = __importDefault(require("./routes/device.routes"));
const mailingAddress_routes_1 = __importDefault(require("./routes/mailingAddress.routes"));
const settings_routes_1 = __importDefault(require("./routes/settings.routes"));
const holiday_routes_1 = __importDefault(require("./routes/holiday.routes"));
const client_routes_1 = __importDefault(require("./routes/client.routes"));
const lTServiceType_routes_1 = __importDefault(require("./routes/lTServiceType.routes"));
const standardServiceType_routes_1 = __importDefault(require("./routes/standardServiceType.routes"));
const serviceForm_routes_1 = __importDefault(require("./routes/serviceForm.routes"));
const resultForm_routes_1 = __importDefault(require("./routes/resultForm.routes"));
const legalDelivery_routes_1 = __importDefault(require("./routes/legalDelivery.routes"));
const internalServerRouter = (0, express_1.Router)();
// Use Routes
app.use(`${Constants_1.baseURL}/user`, user_routes_1.default);
app.use(`${Constants_1.baseURL}/role`, role_routes_1.default);
app.use(`${Constants_1.baseURL}/service-result`, serviceResult_routes_1.default);
app.use(`${Constants_1.baseURL}/service-type`, serviceType_routes_1.default);
app.use(`${Constants_1.baseURL}/server`, server_routes_1.default);
app.use(`${Constants_1.baseURL}/device`, device_routes_1.default);
app.use(`${Constants_1.baseURL}/mailing-address`, mailingAddress_routes_1.default);
app.use(`${Constants_1.baseURL}/setting`, settings_routes_1.default);
app.use(`${Constants_1.baseURL}/holiday`, holiday_routes_1.default);
app.use(`${Constants_1.baseURL}/client`, client_routes_1.default);
app.use(`${Constants_1.baseURL}/ltservice-type`, lTServiceType_routes_1.default);
app.use(`${Constants_1.baseURL}/standard-service-type`, standardServiceType_routes_1.default);
app.use(`${Constants_1.baseURL}/service-form`, serviceForm_routes_1.default);
app.use(`${Constants_1.baseURL}/result-form`, resultForm_routes_1.default);
app.use(`${Constants_1.baseURL}/legal-delivery`, legalDelivery_routes_1.default);
// API to control server state
app.use(`${Constants_1.baseURL}/internal-server`, internalServerRouter);
internalServerRouter.post('/control', (req, res) => {
    const { status } = req.body;
    res.setHeader('Access-Control-Allow-Origin', 'https://gesilds.com');
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    if (status === true) {
        serverDown = true;
        console.log('Server has been set to down');
        return res.status(200).send('Server is temporarily down');
    }
    else if (status === false) {
        serverDown = false;
        console.log('Server has been set back online');
        return res.status(200).send('Server is back online');
    }
    else {
        return res.status(400).send('Invalid status value');
    }
});
