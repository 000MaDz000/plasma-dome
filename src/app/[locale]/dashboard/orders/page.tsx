import { getOrdersCounts } from "@/app/_actions/get-orders-count";
import DashboardOrdersTable from "@/app/_components/dashboard-orders-table";
import { Box, Card, CardContent, Container, Paper } from "@mui/material";
import { getTranslations } from "next-intl/server";

export default async function DashboardOrdersPage() {
    const counts = await getOrdersCounts();
    const t = await getTranslations("Dashboard.orders");

    return (
        <div>
            <Container>
                <Box className="flex flex-col gap-4">

                    <Paper className="p-7 flex [&>*]:grow gap-2 [&>*>*]:text-center">
                        <Card >
                            <CardContent className="bg-red-50">{t("orders count", { count: counts.all })}</CardContent>
                        </Card>

                        <Card >
                            <CardContent className="bg-green-50 text-green-800">{t("ended orders count", { count: counts.ended })}</CardContent>
                        </Card>

                        <Card>
                            <CardContent className="bg-orange-50 text-orange-500">{t("pending orders count", { count: counts.pending })}</CardContent>
                        </Card>
                    </Paper>

                    <Paper className="overflow-x-auto p-7 text-nowrap">
                        <DashboardOrdersTable />
                    </Paper>
                </Box>
            </Container>
        </div>
    )
}