import { Request, Router } from "express";
import { Order } from "../../../../models";
import { ObjectId } from "bson";

const DashboardRoute = Router();

DashboardRoute.get("/orders?", async (req: Request<{}, {}, {}, { lastId: string }>, res) => {
    try {
        const query: any = {};

        if (req.query.lastId && req.query.lastId.length === 24) {
            query._id = {
                $gt: new ObjectId(req.query.lastId),
            };
        }

        const data = await Order.find(query).limit(20);

        res.json(data);
    }
    catch (err) {
        res.status(500).json([]);
    }
});

export default DashboardRoute;