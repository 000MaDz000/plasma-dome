import dotenv from "dotenv";
import colors from "colors";
colors.enable();
dotenv.config(); // load .env files
import express from "express";
import { createServer } from "http";
import next from "next";
import dbConnectionPromise from "../models";
import throwFail from "./functions/throw-fail";
import session from "express-session";
import MongoStore from "connect-mongo";

const PORT = (process.env.PORT || 3000) as number;
const app = express();
const server = createServer(app);

const nextServer = next({
    "dev": process.env.NODE_ENV === "development",
    "customServer": true,
    "httpServer": server
});

const handle = nextServer.getRequestHandler();
const sessionStore = MongoStore.create({
    mongoUrl: process.env.MONGO_CONNECTION_URL,
});

global.appSessions = sessionStore;

(async () => {
    console.log("connecting to the database".yellow);

    await dbConnectionPromise.catch(() => throwFail("database connection fails"));
    console.log("database connected successfully".green);

    console.log("");
    console.log("preparing the next.js server ...".yellow);
    await nextServer.prepare().catch((err) => throwFail("failed to start next.js"));
    console.log("next.js server is now running".green, `on port: ${PORT}`.blue);


    server.listen(3000);
})();


app.use(session({ "store": sessionStore, secret: "MADZZZ", "saveUninitialized": true }));
app.use("/api", (req, res) => {
    appSessions.get(req.sessionID, (err, s) => console.log(err, s))
})

app.use(async (req, res) => {
    handle(req, res);
});