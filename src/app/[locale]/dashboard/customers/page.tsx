import UsersTable from "@/app/_components/users-table";
import CustomerTable from "@/app/_components/users-table";
import { Container, Paper, Typography } from "@mui/material";
import { getTranslations } from "next-intl/server";

export default async function CustomersPage() {
    const t = await getTranslations("Dashboard");
    return (
        <div className="flex flex-col gap-32">
            <Typography variant="h5">{t("customers.page title")}</Typography>

            <Container>
                <Paper>
                    <UsersTable />
                </Paper>
            </Container>
        </div>
    )
}