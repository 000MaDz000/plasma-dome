import dotenv from "dotenv";
import colors from "colors";
colors.enable();
dotenv.config(); // load .env files
import express from "express";
import { createServer } from "http";
import next from "next";
import dbConnectionPromise from "../models";
import throwFail from "./functions/throw-fail";


const PORT = (process.env.PORT || 3000) as number;
const app = express();
const server = createServer(app);

const nextServer = next({
    "dev": process.env.NODE_ENV === "development",
    "customServer": true,
    "httpServer": server
});

const handle = nextServer.getRequestHandler();


(async () => {
    console.log("connecting to the database");
    console.log("db url:", process.env.MONGO_CONNECTION_URL);

    await dbConnectionPromise.catch(() => throwFail("database connection fails"));
    console.log("database connected successfully");

    console.log("");
    console.log("preparing the next.js server ...".yellow);
    await nextServer.prepare();
    console.log("next.js server is now running".green);

})();

//     console.log("server prepared");

//     // start the server
//     server.listen(PORT, () => {
//         console.log(`server started at port: ${PORT}`);
//     });
// });




app.use(async (req, res) => {
    handle(req, res);
});