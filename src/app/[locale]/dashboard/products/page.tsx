'use client';

import CreateProductForm from "@/app/_components/create-product-form";
import ProductsCountBox from "@/app/_components/dashboard-products-count-box";
import FeaturedProductsCountBox from "@/app/_components/featured-products-count-box";
import NormalProductsCountBox from "@/app/_components/normal-products-count-box";
import ProductsStatisticsProvider from "@/app/_components/products-statistics-provider";
import ProductsTable from "@/app/_components/products-table";
import { Box, Paper, Skeleton, Typography } from "@mui/material";
import { useTranslations } from "next-intl";

export default function DashboardProductsPage() {
    const t = useTranslations("Dashboard.products");

    return (
        <div className="flex flex-col gap-4">
            <Paper>
                <Box className="grid m-3 gap-3 grid-cols-3 h-32">
                    <ProductsStatisticsProvider>
                        <ProductsCountBox />
                        <FeaturedProductsCountBox />
                        <NormalProductsCountBox />
                    </ProductsStatisticsProvider>
                </Box>
            </Paper>

            <Paper>
                <Box className="m-4 flex flex-col gap-4">
                    <Typography variant="h6">{t("create product")}</Typography>
                    <CreateProductForm />
                </Box>
            </Paper>

            <Paper>
                <ProductsTable />
            </Paper>
        </div>
    )
}