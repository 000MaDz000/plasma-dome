import { Box, Container, Paper, Typography } from "@mui/material";
import DashboardOrdersChart from "@/app/_components/dashboard-orders-chart";
import DashboardOrdersTable from "@/app/_components/dashboard-orders-table";
import { getTranslations } from "next-intl/server";
import ProductsTable from "@/app/_components/products-table";
import ProductsCountsBoxes from "@/app/_components/dashboard-products-counts-boxes";
import DashboardSalesChart from "@/app/_components/dashboard-sales-chart";
import SalesStatisticsProvider from "@/app/_components/sales-statistics-provider";

export default async function DashboardHome() {
    const t = await getTranslations("Dashboard.home");
    return (
        <div>
            <Container>
                <Box className="flex flex-col gap-3 [&>*]:p-3">

                    <Paper>
                        <Box className="grid gap-3 p-3 grid-cols-3 h-32">
                            <ProductsCountsBoxes />
                        </Box>
                    </Paper>

                    <Paper>
                        <Typography variant="h6" marginTop={1} marginLeft={1}>{t("summary success orders")}</Typography>
                        <DashboardOrdersChart />

                        <SalesStatisticsProvider>
                            <DashboardSalesChart />
                        </SalesStatisticsProvider>
                    </Paper>

                    <Paper>
                        <div className="flex flex-col gap-4">
                            <Typography variant="h6" marginTop={1} marginLeft={1}>{t("last orders")}</Typography>

                            <Box className="overflow-y-auto max-h-screen">
                                <DashboardOrdersTable userAlertsRole="admin" />
                            </Box>
                        </div>
                    </Paper>


                    <Paper>
                        <div className="flex flex-col gap-4">
                            <Typography variant="h6" marginTop={1} marginLeft={1}>{t("products")}</Typography>

                            <Box className="overflow-y-auto max-h-screen">
                                <ProductsTable />
                            </Box>
                        </div>
                    </Paper>
                </Box>
            </Container>
        </div>
    )
}