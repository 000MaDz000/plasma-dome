import ProductsCountBox from "@/app/_components/dashboard-products-count-box";
import { Box, Container, Paper, Skeleton } from "@mui/material";
import DashboardOrdersChart from "@/app/_components/dashboard-orders-chart";

export default function DashboardHome() {
    return (
        <div>
            <Container>
                <Paper>
                    <Box className="grid gap-3 p-3 grid-cols-3 h-32">
                        <ProductsCountBox />
                        <Skeleton className="py-3 px-2 grow" />
                        <Skeleton className="py-3 px-2 grow" />
                    </Box>
                </Paper>

                <DashboardOrdersChart />
            </Container>
        </div>
    )
}