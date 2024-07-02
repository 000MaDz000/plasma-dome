import { Request, Router } from "express";
import { Order, Statistics } from "../../../../models";
import { ObjectId } from "bson";
import { IStatisticsName } from "@/models/statistics";

const OrdersRoute = Router();

OrdersRoute.get("/?", async (req: Request<{}, {}, {}, { lastId: string, month?: number, ended?: string }>, res) => {
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

OrdersRoute.get("/statistics/?", async (req: Request<{}, {}, {}, { year: string }>, res) => {
    try {
        const names: IStatisticsName[] = ["endedOrders", "canceledOrders", "liveOrders", "totalOrders"];
        const year = parseInt(req.query.year);
        const data = await Statistics.find({ name: { $in: names }, "date.year": isNaN(year) ? new Date().getUTCFullYear() : year }).sort({ "date.year": 1, "date.month": 1, "date.day": 1 });
        res.json(data);
    }
    catch (err) {
        res.json([]);
    }
});


export default OrdersRoute;