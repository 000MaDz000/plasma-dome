'use client';

import { useContext } from "react";
import ProductsStatistics from "../_contexts/products-statistics";
import { Box, Skeleton, Tooltip } from "@mui/material";
import { useTranslations } from "next-intl";

export default function NormalProductsCountBox() {
    const statistics = useContext(ProductsStatistics);
    const t = useTranslations("Dashboard.products");

    return (
        statistics.normalProducts === null ? <Skeleton /> : (
            <Tooltip title={t("normal")}>
                <Box className={"flex items-center justify-evenly shadow-sm border rounded-md bg-slate-200"}>
                    <span>{t("normal count")}</span>
                    <span>{statistics.normalProducts}</span>
                </Box>
            </Tooltip>
        )
    )
}