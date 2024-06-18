'use client';

import { Box, Skeleton, Tooltip } from "@mui/material";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import getProductsCount from "../_actions/get-products-count";

export default function ProductsCountBox() {
    const [count, setCount] = useState<number | null>(null);
    const t = useTranslations("Dashboard.products");

    useEffect(() => {
        getProductsCount().then((v) => setCount(v));
    }, []);

    return (
        count === null ? <Skeleton /> : (
            <Tooltip title={count < 50 ? t("recommended count", { recommended: 50 }) : ""}>
                <Box className={"flex items-center justify-evenly shadow-sm border rounded-md " + (count < 20 ? "text-red-500 bg-red-50" : (count < 50 ? "text-yellow-500 bg-stone-50" : "text-green-600 bg-green-50"))}>
                    <span>{t("count")}</span>
                    <span>{count}</span>
                </Box>
            </Tooltip>
        )
    )
}