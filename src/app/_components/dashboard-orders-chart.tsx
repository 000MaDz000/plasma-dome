'use client';

import { LineChart } from "@mui/x-charts";
import { useEffect, useMemo, useState } from "react";
import { OrdersApi } from "../_classes/api";
import { IOrder } from "@/models/order";
import { useTranslations } from "next-intl";
import formatOrderChartData from "../_functions/dashboards-orders-chart-formatter";

export default function DashboardOrdersChart() {
    const api = useMemo(() => new OrdersApi(), []);
    const t = useTranslations("Dashboard.orders");
    const [orders, setOrders] = useState<IOrder[]>([]);
    const formated = useMemo(() => formatOrderChartData(orders), [orders]);

    useEffect(() => {
        api.fetchOrders({ month: new Date().getMonth(), ended: true }).then((data) => {
            setOrders(data);
        })
    }, []);


    return (
        <>
            <LineChart
                series={[{
                    "data": formated,
                    "valueFormatter": val => t("egp", { price: val }),
                    area: true
                }]}

                height={450}

                xAxis={[{
                    data: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31],

                    valueFormatter(val) {
                        return val.toString() || ""
                    },

                    min: 0,
                    max: 31
                }]}

            />
        </>
    )
}