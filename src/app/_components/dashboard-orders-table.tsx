'use client';
import { Box, Skeleton, Table, TableBody, TableCell, TableHead, TableRow, Typography } from "@mui/material";
import { useTranslations } from "next-intl";
import { useEffect, useMemo, useState, useTransition } from "react";
import { OrdersApi } from "../_classes/api";
import { IOrder, IOrderStatus } from "@/models/order";
import DashboardOrderRow from "./dashboard-order-row";
import EndOrder, { CancelOrder } from "../_actions/order";

export default function DashboardOrdersTable({ userAlertsRole }: { userAlertsRole?: "admin" | "employee" | "customer" }) {
    const t = useTranslations("Dashboard.orders");
    const [pending, setPending] = useState(true);
    const [data, setData] = useState<IOrder[]>([]);
    const api = useMemo(() => new OrdersApi(), []);
    const [isPending, startTransition] = useTransition();

    useEffect(() => {
        if (!pending) return;

        api.fetchOrders().then((orders) => setData([...data, ...orders]));
        setPending(false);

    }, [pending]);

    const onChangeStatus = (newStatus: IOrderStatus, orderId: string) => {
        startTransition(() => {
            setData(data.map(val => val._id === orderId ? { ...val, status: newStatus } : val));
        });
    }

    return (
        <>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell align="center">{t("customer name")}</TableCell>
                        <TableCell align="center">{t("customer phone")}</TableCell>
                        <TableCell align="center">{t("delevery location")}</TableCell>
                        <TableCell align="center">{t("date")}</TableCell>
                        <TableCell align="center">{t("state")}</TableCell>
                        <TableCell align="center">{t("total price")}</TableCell>
                        <TableCell align="center"></TableCell>
                    </TableRow>
                </TableHead>

                <TableBody>
                    {
                        data.map((order) => (
                            <DashboardOrderRow onChangeStatus={(status: IOrderStatus) => onChangeStatus(status, order._id)} order={order} key={order._id} userAlertsRole={userAlertsRole} />
                        ))
                    }
                </TableBody>
            </Table>

            {(!pending && data.length === 0) && (
                <Box className="text-center mt-7">
                    <Typography>{t("no data")}</Typography>
                </Box>
            )}

            {
                pending ? (
                    <>
                        <Skeleton className="w-full  py-2"></Skeleton>
                        <Skeleton className="w-full  py-2"></Skeleton>
                        <Skeleton className="w-full  py-2"></Skeleton>
                    </>
                ) : ""
            }
        </>

    )
}