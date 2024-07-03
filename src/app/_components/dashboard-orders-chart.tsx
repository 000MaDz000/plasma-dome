'use client';

import { BarChart } from "@mui/x-charts";
import { useEffect, useMemo, useState } from "react";
import { OrdersApi } from "../_classes/api";
import { useTranslations } from "next-intl";
import { IStatistics } from "@/models/statistics";
import { CircularProgress, Skeleton, Typography } from "@mui/material";

export default function DashboardOrdersChart() {
    const api = useMemo(() => new OrdersApi(), []);
    const t = useTranslations("Dashboard.orders");
    const [statistics, setStatistics] = useState<IStatistics[]>([]);

    const fullData = useMemo(() => {
        const dataStructure: { [key: string]: IStatistics[] | number } = {
            "liveOrders": [
                { name: "liveOrders", date: { month: 1, year: 99, day: 99 }, count: 0 },
                { name: "liveOrders", date: { month: 2, year: 99, day: 99 }, count: 0 },
                { name: "liveOrders", date: { month: 3, year: 99, day: 99 }, count: 0 },
                { name: "liveOrders", date: { month: 4, year: 99, day: 99 }, count: 0 },
                { name: "liveOrders", date: { month: 5, year: 99, day: 99 }, count: 0 },
                { name: "liveOrders", date: { month: 6, year: 99, day: 99 }, count: 0 },
                { name: "liveOrders", date: { month: 7, year: 99, day: 99 }, count: 0 },
                { name: "liveOrders", date: { month: 8, year: 99, day: 99 }, count: 0 },
                { name: "liveOrders", date: { month: 9, year: 99, day: 99 }, count: 0 },
                { name: "liveOrders", date: { month: 10, year: 99, day: 99 }, count: 0 },
                { name: "liveOrders", date: { month: 11, year: 99, day: 99 }, count: 0 },
                { name: "liveOrders", date: { month: 12, year: 99, day: 99 }, count: 0 },
            ],
            "endedOrders": [
                { name: "endedOrders", date: { month: 1, year: 99, day: 99 }, count: 0 },
                { name: "endedOrders", date: { month: 2, year: 99, day: 99 }, count: 0 },
                { name: "endedOrders", date: { month: 3, year: 99, day: 99 }, count: 0 },
                { name: "endedOrders", date: { month: 4, year: 99, day: 99 }, count: 0 },
                { name: "endedOrders", date: { month: 5, year: 99, day: 99 }, count: 0 },
                { name: "endedOrders", date: { month: 6, year: 99, day: 99 }, count: 0 },
                { name: "endedOrders", date: { month: 7, year: 99, day: 99 }, count: 0 },
                { name: "endedOrders", date: { month: 8, year: 99, day: 99 }, count: 0 },
                { name: "endedOrders", date: { month: 9, year: 99, day: 99 }, count: 0 },
                { name: "endedOrders", date: { month: 10, year: 99, day: 99 }, count: 0 },
                { name: "endedOrders", date: { month: 11, year: 99, day: 99 }, count: 0 },
                { name: "endedOrders", date: { month: 12, year: 99, day: 99 }, count: 0 },
            ],
            "canceledOrders": [
                { name: "canceledOrders", date: { month: 1, year: 99, day: 99 }, count: 0 },
                { name: "canceledOrders", date: { month: 2, year: 99, day: 99 }, count: 0 },
                { name: "canceledOrders", date: { month: 3, year: 99, day: 99 }, count: 0 },
                { name: "canceledOrders", date: { month: 4, year: 99, day: 99 }, count: 0 },
                { name: "canceledOrders", date: { month: 5, year: 99, day: 99 }, count: 0 },
                { name: "canceledOrders", date: { month: 6, year: 99, day: 99 }, count: 0 },
                { name: "canceledOrders", date: { month: 7, year: 99, day: 99 }, count: 0 },
                { name: "canceledOrders", date: { month: 8, year: 99, day: 99 }, count: 0 },
                { name: "canceledOrders", date: { month: 9, year: 99, day: 99 }, count: 0 },
                { name: "canceledOrders", date: { month: 10, year: 99, day: 99 }, count: 0 },
                { name: "canceledOrders", date: { month: 11, year: 99, day: 99 }, count: 0 },
                { name: "canceledOrders", date: { month: 12, year: 99, day: 99 }, count: 0 },
            ],
            totalOrders: 0,
        }

        for (let statistic of statistics) {
            const key = statistic.name;
            if (key == "totalOrders") {
                (dataStructure.totalOrders as number) += statistic.count;
            }
            else if (key in dataStructure) {
                (dataStructure[key] as IStatistics[])[statistic.date.month - 1].count += statistic.count;
            }
        };

        return dataStructure;
    }, [statistics]);

    useEffect(() => {
        api.fetchStatistics().then(setStatistics);
    }, []);
    console.log(statistics);

    return (
        statistics.length ?
            (
                <div>
                    <Typography variant="h6" textAlign={"center"}>{t("chart.total orders", { ordersCount: fullData.totalOrders as number })}</Typography>
                    <BarChart
                        xAxis={[
                            {
                                scaleType: "band",
                                data: (fullData.liveOrders as IStatistics[]).map(v => t("months." + v.date.month))
                            }
                        ]}

                        yAxis={[
                            { min: 0, max: statistics.length >= 50 ? statistics.length : 50 },
                        ]}

                        series={[
                            // Pending orders
                            {
                                data: (fullData.liveOrders as IStatistics[]).map(v => v.count),
                                label: t("chart.live orders"),
                                id: "live orders",
                                valueFormatter(v) {
                                    return (v || 0) as any;
                                }
                            },
                            // Success orders
                            {
                                data: (fullData.endedOrders as IStatistics[]).map(v => v.count),
                                label: t("chart.success orders"),
                                id: "success orders",
                                valueFormatter(v) {
                                    return (v || 0) as any;
                                }
                            },
                            // canceled orders
                            {
                                data: (fullData.canceledOrders as IStatistics[]).map(v => v.count),
                                label: t("chart.canceled orders"),
                                id: "canceled orders",
                                valueFormatter(v) {
                                    return (v || 0) as any;
                                },
                            },
                        ]}
                        height={450}
                    />
                </div>
            )
            : <Skeleton height={450} />
    )
}