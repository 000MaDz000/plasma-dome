'use client';
import { Typography } from "@mui/material";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { FaCog, FaDollarSign, FaHome, FaProductHunt, FaUsers } from "react-icons/fa";
import { FaBagShopping, FaMessage } from "react-icons/fa6";

export default function DashboardSidebarContent() {
    const t = useTranslations("Dashboard.links");
    return (
        <div className="flex flex-col py-2 gap-5 [&>*]:flex [&>*]:items-center [&>*]:gap-8 [&>*]:px-6 [&>*]:py-2 transition-all [&>*>svg]:text-xl">

            <Link href="/dashboard/" className="hover:bg-white hover:shadow-md transition-all">
                <FaHome />
                <Typography variant="subtitle1">{t("home")}</Typography>
            </Link>

            <Link href="/dashboard/orders" className="hover:bg-white hover:shadow-md transition-all">
                <FaBagShopping />
                <Typography variant="subtitle1" margin={"0px"} padding={"0px"}>{t("orders")}</Typography>
            </Link>

            <Link href="/dashboard/products" className="hover:bg-white hover:shadow-md transition-all">
                <FaProductHunt />
                <Typography variant="subtitle1" margin={"0px"} padding={"0px"}>{t("products")}</Typography>
            </Link>

            <Link href="/dashboard/customers" className="hover:bg-white hover:shadow-md transition-all">
                <FaUsers />
                <Typography variant="subtitle1" margin={"0px"} padding={"0px"}>{t("customers")}</Typography>
            </Link>


        </div>
    )
}