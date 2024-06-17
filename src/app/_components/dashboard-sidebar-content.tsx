'use client';
import { Typography } from "@mui/material";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { FaHome } from "react-icons/fa";

export default function DashboardSidebarContent() {
    const t = useTranslations("Dashboard.links");
    return (
        <div className="flex flex-col px-6 py-2 gap-4 [&>*]:flex [&>*]:gap-2 [&>*>svg]:text-xl">

            <Link href="/dashboard/" className="[&.active]:bg-red-500">
                <FaHome />
                <Typography variant="button">{t("home")}</Typography>
            </Link>

            <Link href="/dashboard/orders">
                <FaHome />
                <Typography variant="button" margin={"0px"} padding={"0px"}>{t("orders")}</Typography>
            </Link>

            <Link href="/dashboard/products">
                <FaHome />
                <Typography variant="button" margin={"0px"} padding={"0px"}>{t("products")}</Typography>
            </Link>

            <Link href="/dashboard/payments">
                <FaHome />
                <Typography variant="button" margin={"0px"} padding={"0px"}>{t("payments")}</Typography>
            </Link>

            <Link href="/dashboard/reports">
                <FaHome />
                <Typography variant="button" margin={"0px"} padding={"0px"}>{t("reports")}</Typography>
            </Link>

            <Link href="/dashboard/settings">
                <FaHome />
                <Typography variant="button" margin={"0px"} padding={"0px"}>{t("settings")}</Typography>
            </Link>

        </div>
    )
}