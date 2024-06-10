import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

//Defining Express App Object
const app = express();

//Applying CORS policy
app.use(cors({
    origin: process.env.CORS_ORIGIN_POLICY,
    credentials: true
}));

//Applying Middlewares on Express App
app.use(express.json({limit: "20kb"}));
app.use(express.urlencoded({extended: true, limit: "20kb"}));
app.use(express.static("public"));
app.use(cookieParser());



export { app };