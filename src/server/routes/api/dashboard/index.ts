import { Request, Router } from "express";
import { Order } from "../../../../models";
import { ObjectId } from "bson";

const DashboardRoute = Router();

DashboardRoute.get("/orders?", async (req: Request<{}, {}, {}, { lastId: string, month?: number, ended?: string }>, res) => {
    try {
        const query: any = {};
        if (req.query.month) {
            req.query.month = parseInt(req.query.month as unknown as string);
            const date = new Date();
            date.setDate(1);
            date.setMonth(req.query.month);

            const endDate = new Date();
            endDate.setMonth(req.query.month);
            endDate.setDate(31);

            query.orderDate = {
                $gte: date,
                $lte: endDate,
            };
        }

        if (req.query.ended == "true") {
            query.ended = true;
        }

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