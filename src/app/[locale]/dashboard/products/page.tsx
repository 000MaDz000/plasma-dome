import getSetting from "@/app/_actions/get-setting";
import CreateProductForm from "@/app/_components/create-product-form";
import ProductsCountsBoxes from "@/app/_components/dashboard-products-counts-boxes";
import ProductsTable from "@/app/_components/products-table";
import { Box, Paper, Typography } from "@mui/material";
import { getTranslations } from "next-intl/server";

export default async function DashboardProductsPage() {
    const t = await getTranslations("Dashboard.products");
    const systemCategories = await getSetting("categories");

    return (
        <div className="flex flex-col gap-4">
            <Paper>
                <Box className="grid m-3 gap-3 grid-cols-3 h-32">
                    <ProductsCountsBoxes />
                </Box>
            </Paper>

            <Paper>
                <Box className="m-4 flex flex-col gap-4">
                    <Typography variant="h6">{t("create product")}</Typography>
                    <CreateProductForm />
                </Box>
            </Paper>

            <Paper>
                <ProductsTable systemCategories={systemCategories.value} />
            </Paper>
        </div>
    )
}