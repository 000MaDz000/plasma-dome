import { Request, Router } from "express";
import { User } from "../../../../models";
const UsersRoute = Router();

UsersRoute.get("/customers?", async (req: Request<{}, {}, {}, { lastId?: string }>, res) => {
    try {
        const idQuery: any = {};
        if (req.query.lastId && req.query.lastId.length == 24) {
            idQuery._id = req.query.lastId;
        }

        const customers = await User.find({ ...idQuery, "permissions.name": { $ne: "admin" } }).limit(20);
        res.json(customers.map(obj => ({ ...obj.toObject(), password: undefined })));
    }
    catch (err) {
        res.status(500).json([]);
    }
});

UsersRoute.get("/admins", async (req: Request<{}, {}, {}, { lastId?: string }>, res) => {
    try {
        const idQuery: any = {};
        if (req.query.lastId && req.query.lastId.length == 24) {
            idQuery._id = req.query.lastId;
        }

        const admins = await User.find({ ...idQuery, "permissions.name": "admin" }).limit(20);
        res.json(admins.map(obj => ({ ...obj.toObject(), password: undefined })));
    }
    catch (err) {
        res.status(500).json([]);
    }
});

UsersRoute.put("/admins", async (req: Request<{}, {}, {}, { userId?: string, role: "role" | "unrole", reason: string }>, res) => {
    try {
        if (!req.query.userId || req.query.userId.length !== 24) return res.sendStatus(400);
        if (req.query.role !== "role" && req.query.role !== "unrole") return res.sendStatus(400);

        let updateQueryObj: any = {};

        if (req.query.role == "role") {
            updateQueryObj = {
                $addToSet: {
                    permissions: {
                        name: "admin",
                        granted: true,
                        reason: req.query.reason
                    }
                }
            }
        }

        else if (req.query.role == "unrole") {
            updateQueryObj = {
                $pull: {
                    permissions: {
                        name: "admin",
                    }
                }
            }
        }

        const dbRes = await User.updateOne(
            {
                _id: req.query.userId
            },
            updateQueryObj
        );

        if (dbRes.modifiedCount) {
            res.sendStatus(201);
        }
        else {
            res.sendStatus(404);
        }
    }
    catch (err) {
        res.sendStatus(500);
    }
});


UsersRoute.get("/employee", async (req: Request<{}, {}, {}, { lastId?: string }>, res) => {
    try {
        const idQuery: any = {};
        if (req.query.lastId && req.query.lastId.length == 24) {
            idQuery._id = req.query.lastId;
        }

        const employee = await User.find({ ...idQuery, "permissions.name": "employee" }).limit(20);
        res.json(employee.map(obj => ({ ...obj.toObject(), password: undefined })));
    }
    catch (err) {
        res.status(500).json([]);
    }
});

UsersRoute.put("/employee", async (req: Request<{}, {}, {}, { userId?: string, role: "role" | "unrole", reason: string }>, res) => {
    try {
        if (!req.query.userId || req.query.userId.length !== 24) return res.sendStatus(400);
        if (req.query.role !== "role" && req.query.role !== "unrole") return res.sendStatus(400);

        let updateQueryObj: any = {};

        if (req.query.role == "role") {
            updateQueryObj = {
                $addToSet: {
                    permissions: {
                        name: "employee",
                        granted: true,
                        reason: req.query.reason
                    }
                }
            }
        }

        else if (req.query.role == "unrole") {
            updateQueryObj = {
                $pull: {
                    permissions: {
                        name: "employee",
                    }
                }
            }
        }

        const dbRes = await User.updateOne(
            {
                _id: req.query.userId
            },
            updateQueryObj
        );

        if (dbRes.modifiedCount) {
            res.sendStatus(201);
        }
        else {
            res.sendStatus(404);
        }
    }
    catch (err) {
        res.sendStatus(500);
    }
});



export default UsersRoute;