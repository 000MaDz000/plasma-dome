'use client';
import { Paper, Typography } from "@mui/material";
import DashboardCategoriesTable from "@/app/_components/dashboard-categories-table";
import { ISetting } from "@/models/settings";
import { useTranslations } from "next-intl";

export default function DashboardCategoriesPapers({ systemCategories, recommendations }: { systemCategories: ISetting, recommendations: ISetting }) {
    const t = useTranslations("Dashboard.recommendations");

    return (
        <>
            <Paper className="p-7 flex flex-col gap-7">
                <Typography variant="h5">{t("recommended categories")}</Typography>
                <DashboardCategoriesTable data={recommendations} noDataMessage={t("no recommended categories")} onAdd={() => { }} title={t("recommended categories")} />
            </Paper>

            <Paper className="p-7 flex flex-col gap-7">
                <Typography variant="h5">{t("categories")}</Typography>
                <DashboardCategoriesTable data={systemCategories} noDataMessage={t("no categories")} onAdd={() => { }} title={t("categories")} />
            </Paper>
        </>
    )
}