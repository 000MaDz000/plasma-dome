'use client';
import { IStatistics, IStatisticsName } from "@/models/statistics";
import { useTranslations } from "next-intl";
import { ReactNode, useEffect, useMemo, useState } from "react";
import { OrdersApi } from "../_classes/api";
import StatisticsDatasetMonthly from "../_functions/statistics-dataset-monhly";
import SalesStatistics from "../_contexts/sales-statistics";

const name: IStatisticsName = "salesValue";

export default function SalesStatisticsProvider({ children }: { children: ReactNode }) {
    const [statistics, setStatistics] = useState<IStatistics[]>([]);

    const fullData = useMemo(() => {
        if (!statistics.length) return [];
        return StatisticsDatasetMonthly(statistics, name);
    }, [statistics]);


    useEffect(() => {
        OrdersApi.getSalesStatistics().then(setStatistics);
    }, []);


    return fullData.length && (
        <SalesStatistics.Provider value={fullData}>
            {children}
        </SalesStatistics.Provider>
    );
}