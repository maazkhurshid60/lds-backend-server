import express, { Request, Response } from "express";
import { exec } from "child_process";
import { asyncHandler } from "../utils/AsyncHandler";
let isServerDown = false;

// Define the route handler function
const toggleServerHandler = async (req: Request, res: Response) => {
    const { shutdown } = req.body;  // Expected to send { shutdown: true } or { shutdown: false }

    if (shutdown === true) {
        // If shutdown is true, set the server state to down
        isServerDown = true;
        // Gracefully shutdown the server
        res.status(200).send({ message: "Server shutting down..." });
        console.log("Shutting down the server...");
        setTimeout(() => {
            process.exit(0);  // Exit the Node.js process, effectively shutting it down
        }, 500); // Optional: wait a bit for response to be sent
    } else if (shutdown === false) {
        // You can restart the server here, or trigger the restart logic.
        // Restart using PM2 or other process managers (e.g., using `exec` command)
        res.status(200).send({ message: "Server will restart..." });

        exec('pm2 restart your-server-process-name', (err, stdout, stderr) => {
            if (err) {
                console.error(`Error restarting server: ${stderr}`);
                return;
            }
            console.log(`Server restart output: ${stdout}`);
        });
    } else {
        res.status(400).send({ message: "Invalid input. Please provide a true or false value." });
    }
};

export default toggleServerHandler