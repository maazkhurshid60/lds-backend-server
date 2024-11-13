import express, { Router } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { baseURL } from "./utils/Constants";
import { Request, Response } from 'express';

const app = express();


let serverDown = false; // Flag to track whether the server should be down

// Apply CORS policy
app.use(cors({
    origin: ['https://gesilds.com', 'http://localhost:5173'],
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Add all allowed methods
    allowedHeaders: ['Content-Type', 'Authorization'], // Include any headers that are expected in requests
}));

// Middleware to check if the server is down
app.use((req, res, next) => {

    if (serverDown && req.originalUrl !== `${baseURL}/internal-server/control`) {
        return serverDown; // Block access to all routes except /server/control
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

const internalServerRouter = Router();

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
app.use(`${baseURL}/server-down`, legalDeliveryRouter);



// API to control server state
app.use(`${baseURL}/internal-server`, internalServerRouter);

internalServerRouter.post('/control', (req: Request, res: Response) => {
    const { status } = req.body;

    if (status === true) {
        serverDown = true;
    } else {
        serverDown = false;
    }

    // Send a response with the current server status
    res.json({ serverDown });
});




export { app };
