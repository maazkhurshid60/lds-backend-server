import { app } from "./app";
import dotenv from "dotenv";
import connectionToDB from "./db";

//Giving path to .env file
dotenv.config({
    path: "./.env"
});

connectionToDB()
    .then(() => {
        app.listen(
            process.env.PORT || 8000,
            () => {
                console.log(`SERVER IS RUNNING AT ${process.env.PORT}`);
            }
        );
    })
    .catch((error) => {
        console.log("MONGODB CONNECTION FAILED: ERROR: ", error);
    })

