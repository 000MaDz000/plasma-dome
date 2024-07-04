import CreateAdForm from "@/app/_components/create-ad-form";
import DashboardAdsTable from "@/app/_components/dashboard-ads-table";
import { Box, Container, Paper, Typography } from "@mui/material";
import { getTranslations } from "next-intl/server";

export default async function AdsPage() {
    const t = await getTranslations("Dashboard.ads");

    return (
        <div>
            <Container>
                <Box className="flex flex-col gap-14">
                    <Paper className="p-7 flex flex-col gap-7">
                        <Typography variant="h6">
                            {t("available ads")}
                        </Typography>

                        <DashboardAdsTable />
                    </Paper>

                    <Paper className="p-7 flex flex-col gap-7">
                        <Typography variant="h6">
                            {t("create ad")}
                        </Typography>
                        <CreateAdForm />
                    </Paper>
                </Box>
            </Container>
        </div>
    )
}