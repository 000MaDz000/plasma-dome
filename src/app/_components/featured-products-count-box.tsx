'use client';

import { useContext } from "react";
import ProductsStatistics from "../_contexts/products-statistics";
import { Box, Skeleton, Tooltip } from "@mui/material";
import { useTranslations } from "next-intl";

export default function FeaturedProductsCountBox() {
    const statistics = useContext(ProductsStatistics);
    const t = useTranslations("Dashboard.products");

    return (
        statistics.featuredProducts === null ? <Skeleton /> : (
            <Tooltip title={t("featured")}>
                <Box className={"flex items-center justify-evenly shadow-sm border rounded-md bg-gray-200"}>
                    <span>{t("featured count")}</span>
                    <span>{statistics.featuredProducts}</span>
                </Box>
            </Tooltip>
        )
    )
}