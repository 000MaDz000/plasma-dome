import { IStatisticsName } from "@/models/statistics";
import { Statistics } from "../../../../models";
import { Request, Router } from "express";

const SalesRoute = Router();

SalesRoute.get("/statistics/values", async (req: Request<{}, {}, {}, { year?: string, month?: string, day?: string }>, res) => {
    try {
        const name: IStatisticsName = "salesValue";

        const year = parseInt(req.query.year || "invalidValue");
        const month = parseInt(req.query.month || "invalidValue");
        const day = parseInt(req.query.day || "invalidValue");

        const dateQuery: any = {
            "date.year": year && !isNaN(year) ? year : new Date().getUTCFullYear(),
        };


        if (!isNaN(month)) dateQuery["date.month"] = month; // setting the date query data
        if (!isNaN(day)) dateQuery["date.day"] = day; // setting the date query data

        const values = await Statistics.find({ name, ...dateQuery });
        res.json(values);
    }
    catch (err) {
        res.status(500).json([]);
    }
});

export default SalesRoute;