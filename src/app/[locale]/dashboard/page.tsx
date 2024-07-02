import ProductsCountBox from "@/app/_components/dashboard-products-count-box";
import { Box, Container, Paper, Skeleton, Typography } from "@mui/material";
import DashboardOrdersChart from "@/app/_components/dashboard-orders-chart";
import DashboardOrdersTable from "@/app/_components/dashboard-orders-table";
import { getTranslations } from "next-intl/server";
import ProductsTable from "@/app/_components/products-table";

export default async function DashboardHome() {
    const t = await getTranslations("Dashboard.home");
    return (
        <div>
            <Container>
                <Box className="flex flex-col gap-3 [&>*]:p-3">

                    <Paper>
                        <Box className="grid gap-3 p-3 grid-cols-3 h-32">
                            <ProductsCountBox />
                            <Skeleton className="py-3 px-2 grow" />
                            <Skeleton className="py-3 px-2 grow" />
                        </Box>
                    </Paper>

                    <Paper>
                        <Typography variant="h6" marginTop={1} marginLeft={1}>{t("summary success orders")}</Typography>
                        <DashboardOrdersChart />
                    </Paper>

                    <Paper>
                        <div className="flex flex-col gap-4">
                            <Typography variant="h6" marginTop={1} marginLeft={1}>{t("last orders")}</Typography>

                            <Box className="overflow-y-auto max-h-screen">
                                <DashboardOrdersTable />
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