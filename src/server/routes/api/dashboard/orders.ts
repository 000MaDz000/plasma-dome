import { Request, Router } from "express";
import { Order, Statistics, User } from "../../../../models";
import { ObjectId } from "bson";
import { IStatisticsName } from "@/models/statistics";
import DashboardLocker from "../../lockers/pages/dashboard";
import { IOrderStatus } from "@/models/order";

const OrdersRoute = Router();

OrdersRoute.post("/", async (req, res) => {
    try {
        if (!req.session.authorized) return res.redirect("/login");

        const deleveryAddress = "";
        const orderData = req.session.cart?.products;

        if (!orderData || !orderData.length) return res.redirect("/store");
        let total = 0;
        for (let product of orderData) {
            const discount = product.discount ? ((product.price * product.discount) / 100) : 0;
            total += (product.price - discount) * product.quantity;
        }

        const user = await User.findOne({ mobile: req.session.user?.mobile });
        const order = new Order({
            "customerName": req.session.user?.name || user?.name,
            "customerPhone": req.session.user?.mobile,
            "totalPrice": total,
            "products": orderData,
            deleveryAddress,
        });

        await order.save();

        req.session.cart = { products: [] };
        res.status(200).redirect("/user");

        // statistics
        const statisticName: IStatisticsName = "liveOrders";

        await Statistics.updateOne(
            { name: statisticName },
            {
                $inc: {
                    count: 1
                }
            },
            { upsert: true },
        );
    }
    catch (err) {
        console.log(err);

        res.status(400).redirect("/orders/create");
    }
});

OrdersRoute.get("/?", async (req: Request<{}, {}, {}, { lastId?: string, month?: number, ended?: string }>, res) => {
    try {
        if (!req.session.authorized) return res.json([]);
        if (req.session.user?.role !== "admin" && req.session.user?.role !== "employee") {
            // send only the user orders
            const orders = await Order.find({ customerPhone: req.session.user?.mobile || "" });
            res.json(orders);
            return;
        }

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

OrdersRoute.get("/statistics/?", DashboardLocker, async (req: Request<{}, {}, {}, { year: string }>, res) => {
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


OrdersRoute.put("/:orderId", DashboardLocker, async (req: Request<{ orderId: string }, {}, { status: IOrderStatus }>, res) => {
    try {
        const status: IOrderStatus = req.body.status;
        const OBJECTID_LENGTH = 24;
        if (req.params.orderId.length !== OBJECTID_LENGTH) return res.sendStatus(404);
        if (status !== "pending" && status !== "cancelled" && status !== "shipped" && status !== "completed") return res.sendStatus(400);
        const order = await Order.findById(req.params.orderId);

        if (!order) return res.sendStatus(404);

        order.status = status;

        await order.save();
        res.sendStatus(200);



        // change statistice
        let name: IStatisticsName | null = null;
        let decrementName: IStatisticsName | null = null;

        switch (order.status) {
            case "pending":
                decrementName = "liveOrders";
                break;

            case "shipped":
                decrementName = "liveOrders";
                break;

            case "cancelled":
                decrementName = "canceledOrders";
                break;

            case "completed":
                decrementName = "endedOrders";
                break;

        }

        switch (status) {
            case "cancelled":
                name = "canceledOrders";
                break;

            case "completed":
                name = "endedOrders"
                break;

            case "pending":
                name = "liveOrders";
                break;

            case "shipped":
                name = "liveOrders";
                break;
        }

        // decrement the statistics of previous state
        await Statistics.updateOne(
            { name: decrementName },
            { $inc: { count: -1 } },
            { upsert: true },
        )

        // increment the statistics of the new state
        await Statistics.updateOne(
            {
                name,
            },
            {
                $inc: {
                    count: 1
                }
            },
            { upsert: true }
        );

    }
    catch (err) {
        res.sendStatus(500);
    }
});

export default OrdersRoute;