"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const Constants_1 = require("./utils/Constants");
const app = (0, express_1.default)();
exports.app = app;
// Apply CORS policy
const whiteListDomains = ['https://gesilds.com', 'http://localhost:5173', "https://lds-mern-3db4.vercel.app"];
app.use((0, cors_1.default)({
    origin: function (origin, callback) {
        if (whiteListDomains.indexOf(origin) !== -1 || !origin) {
            callback(null, true);
        }
        else {
            callback(new Error('CORS Error'));
        }
    },
    credentials: true,
    // methods: ['GET', 'POST', 'PUT', 'DELETE'], // Add all allowed methods
    // allowedHeaders: ['Content-Type', 'Authorization'], // Include any headers that are expected in requests
}));
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
const serverDown_routes_1 = __importDefault(require("./routes/serverDown.routes"));
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
app.use(`${Constants_1.baseURL}/server-down`, serverDown_routes_1.default);
