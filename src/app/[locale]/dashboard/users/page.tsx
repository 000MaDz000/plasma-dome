import UsersProvider from "@/app/_components/users-provider";
import UsersTable from "@/app/_components/users-table";
import { Box, Container, Paper, Typography } from "@mui/material";
import { getTranslations } from "next-intl/server";

export default async function CustomersPage() {
    const t = await getTranslations("Dashboard");
    return (
        <div className="flex flex-col gap-32">

            <Container>
                <Box className="flex flex-col gap-9">

                    <UsersProvider>

                        <Paper className="p-7">
                            <Typography variant="h5" marginBottom={3}>{t("users.customer title")}</Typography>
                            <UsersTable role="customers" />
                        </Paper>

                        <Paper className="p-7">
                            <Typography variant="h5" marginBottom={3}>{t("users.admin title")}</Typography>
                            <UsersTable role="admins" />
                        </Paper>

                        <Paper className="p-7">
                            <Typography variant="h5" marginBottom={3}>{t("users.employee title")}</Typography>
                            <UsersTable role="employees" />
                        </Paper>

                    </UsersProvider>
                </Box>

            </Container>
        </div>
    )
}