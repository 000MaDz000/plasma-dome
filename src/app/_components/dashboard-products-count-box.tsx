'use client';

import { Box, Skeleton, Tooltip } from "@mui/material";
import { useTranslations } from "next-intl";
import { useContext } from "react";
import ProductsStatistics from "@/app/_contexts/products-statistics";
export default function ProductsCountBox() {
    const t = useTranslations("Dashboard.products");
    const statistics = useContext(ProductsStatistics);
    console.log(statistics);


    return (
        statistics.totalProducts === null ? <Skeleton /> : (
            <Tooltip title={statistics.totalProducts < 50 ? t("recommended count", { recommended: 50 }) : ""}>
                <Box className={"flex items-center justify-evenly shadow-sm border rounded-md " + (statistics.totalProducts < 20 ? "text-red-500 bg-red-50" : (statistics.totalProducts < 50 ? "text-yellow-500 bg-stone-50" : "text-green-600 bg-green-50"))}>
                    <span>{t("count")}</span>
                    <span>{statistics.totalProducts}</span>
                </Box>
            </Tooltip>
        )
    )
}