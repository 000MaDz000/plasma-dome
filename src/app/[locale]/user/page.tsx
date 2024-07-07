import StoreFooter from "@/app/_components/store-footer";
import StoreHeader from "@/app/_components/store-header";
import CartProductsTable from "@/app/_components/cart-products-table";
import session from "@/app/_functions/session"
import { Box, Typography } from "@mui/material";
import { getTranslations } from "next-intl/server";
import { redirect } from "next/navigation";
import DashboardOrdersTable from "@/app/_components/dashboard-orders-table";

export default async function User() {
    const sess = await session();
    const t = await getTranslations("User");

    if (!sess.data.authorized) {
        redirect("/login");
    }

    return (
        <div className="flex flex-col gap-3 min-h-screen bg-gray-100">
            <StoreHeader />
            <Box className="grow flex flex-col gap-y-3 lg:grid md:gap-x-3 md:grid-rows-2 md:grid-cols-2 mx-2">
                <Box className="bg-slate-200 grow lg:row-span-2 lg:col-span-1 flex flex-col gap-4 p-7 rounded-md">
                    <Typography variant="h5">{t("your cart")}</Typography>
                    <CartProductsTable />
                </Box>

                <Box className="bg-slate-200 grow lg:row-span-2 md:col-span-1 p-7 rounded-md overflow-x-auto">
                    <Typography variant="h5">{t("your orders")}</Typography>
                    <DashboardOrdersTable userAlertsRole="customer" />
                </Box>

                <Box className="grow lg:col-span-2 flex">
                    <StoreFooter />
                </Box>
            </Box>
        </div>
    )
}