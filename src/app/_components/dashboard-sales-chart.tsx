'use client';

import { useContext } from "react";
import SalesStatistics from "../_contexts/sales-statistics";
import { LineChart } from "@mui/x-charts";
import { useTranslations } from "next-intl";

export default function DashboardSalesChart() {
    const dataset = useContext(SalesStatistics);
    const t = useTranslations("Dashboard");

    return (
        <LineChart
            xAxis={[{ data: dataset.map(monthData => t("orders.months." + monthData.date.month)), scaleType: "band" }]}
            series={[
                {
                    data: dataset.map(val => val.count),
                    label: t("sales.chart label")
                }
            ]}
            height={450}
        />
    )
}