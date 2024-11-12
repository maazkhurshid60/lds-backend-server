import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { baseURL } from "./utils/Constants";
import { Request, Response } from 'express';

const app = express();


let serverDown = false; // Flag to track whether the server should be down

// Apply CORS policy
app.use(cors({
    // origin: process.env.CORS_ORIGIN_POLICY,
    origin: "*",

    credentials: true,
}));

// Middleware to check if the server is down
app.use((req, res, next) => {
    if (serverDown && req.originalUrl !== `${baseURL}/server/control`) {
        return res.status(503).send('Server is temporarily down'); // Block access to all routes except /server/control
    }
    next(); // Proceed to the next middleware if the server is up
});

// Middlewares
app.use(express.json({ limit: "20kb" }));
app.use(express.urlencoded({ extended: true, limit: "20kb" }));
app.use(cookieParser());

// Import Routes
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

// Use Routes
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

// API to control server state
app.post(`${baseURL}/server/control`, (req: Request, res: Response) => {
    const { status } = req.body; // Expecting a boolean 'status'

    if (status === true) {
        serverDown = true; // Set the flag to down (disable routes)
        console.log('Server has been set to down');
        res.status(200).send('Server is temporarily down');
    } else if (status === false) {
        serverDown = false; // Set the flag to up (enable routes)
        console.log('Server has been set back online');
        res.status(200).send('Server is back online');
    } else {
        res.status(400).send('Invalid status value');
    }
});


export { app };
