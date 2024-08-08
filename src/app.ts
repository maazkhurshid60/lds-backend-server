import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { baseURL } from "./utils/Constants";

//Defining Express App Object
const app = express();

//Applying CORS policy
app.use(cors({
    origin: process.env.CORS_ORIGIN_POLICY,
    credentials: true,
}));

//Applying Middlewares on Express App
app.use(express.json({limit: "20kb"}));
app.use(express.urlencoded({extended: true, limit: "20kb"}));
app.use(express.static("public"));
app.use(cookieParser());

//Importing all the Routes
import userRouter from "./routes/user.routes";
import roleRouter from "./routes/role.routes";
import serviceResultRouter from "./routes/serviceResult.routes";
import serviceTypeRouter from "./routes/serviceType.routes";
import serverRouter from "./routes/server.routes";
import deviceRouter from "./routes/device.routes";
import mailingAddressRouter from "./routes/mailingAddress.routes";
import settingRouter from "./routes/settings.routes";
import holidayRouter from "./routes/holiday.routes";
import clientRouter from "./routes/client.routes";
import lTServiceTypeRouter from "./routes/lTServiceType.routes";
import standardServiceTypeRouter from "./routes/standardServiceType.routes";
import serviceFormRouter from "./routes/serviceForm.routes";
import resultFormRouter from "./routes/resultForm.routes";
import legalDeliveryRouter from "./routes/legalDelivery.routes";

app.use(`${baseURL}/user`, userRouter);
app.use(`${baseURL}/role`, roleRouter);
app.use(`${baseURL}/service-result`, serviceResultRouter);
app.use(`${baseURL}/service-type`, serviceTypeRouter);
app.use(`${baseURL}/server`, serverRouter);
app.use(`${baseURL}/device`, deviceRouter);
app.use(`${baseURL}/mailing-address`, mailingAddressRouter);
app.use(`${baseURL}/setting`, settingRouter);
app.use(`${baseURL}/holiday`, holidayRouter);
app.use(`${baseURL}/client`, clientRouter);
app.use(`${baseURL}/ltservice-type`, lTServiceTypeRouter);
app.use(`${baseURL}/standard-service-type`, standardServiceTypeRouter);
app.use(`${baseURL}/service-form`, serviceFormRouter);
app.use(`${baseURL}/result-form`, resultFormRouter);
app.use(`${baseURL}/legal-delivery`, legalDeliveryRouter);

export { app };