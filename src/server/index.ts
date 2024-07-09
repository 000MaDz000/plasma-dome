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
import ApiRoute from "./routes/api";
import { imagesPath } from "./functions/static";
import DashboardLocker from "./routes/lockers/pages/dashboard";
import { signedCookie } from "cookie-parser";
import "./functions/required-env-data";

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
global.signedCookie = signedCookie;

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

app.use(session({ "store": sessionStore, secret: process.env.COOKIES_SECRET_KEY as string, "saveUninitialized": true, cookie: { "httpOnly": false, "signed": true } }));
app.use("/images", express.static(imagesPath));
app.use("/api", ApiRoute);
app.use("/:locale/dashboard", DashboardLocker);
app.use((req, _res, next) => {
    req.session.save();
    next();
})
app.use(async (req, res) => {
    handle(req, res);
});