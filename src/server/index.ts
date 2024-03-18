import dotenv from "dotenv";
dotenv.config(); // load .env file
import express from "express";
import { createServer } from "http";
import next from "next";

const PORT = (process.env.PORT || 3000) as number;
const app = express();
const server = createServer(app);

const nextServer = next({
    "dev": process.env.NODE_ENV === "development",
    "customServer": true,
    "httpServer": server
});

const handle = nextServer.getRequestHandler();

console.log("preparing the next.js server ...");

nextServer.prepare().then(() => {
    console.log("server prepared");

    // start the server
    server.listen(PORT, () => {
        console.log(`server started at port: ${PORT}`);
    });
});




app.use(async (req, res) => {
    handle(req, res);
});