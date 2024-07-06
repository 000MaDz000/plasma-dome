'use client';
import { IOrder } from "@/models/order";
import { Box, Button, IconButton, Paper, TableCell, TableRow, Typography } from "@mui/material";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { FaArrowDown } from "react-icons/fa";
import Modal from "./modal";
import ProductsTable from "./products-table";

export default function DashboardOrderRow({ order, onOrderEnd, onOrderCanceled }: { order: IOrder, onOrderEnd: () => void, onOrderCanceled: () => void }) {
    const t = useTranslations("Dashboard.orders");
    const [details, setDetails] = useState(false);
    const [modal, setModal] = useState(false);
    const onClickEnd = () => {
        setModal(false);
        onOrderEnd();
    }

    const onCancel = async () => {
        setModal(false);
        onOrderCanceled();
    }

    return (
        <>
            <TableRow hover className="cursor-pointer">
                <TableCell align="center" onClick={() => setModal(true)}>{order.customerName}</TableCell>
                <TableCell align="center" onClick={() => setModal(true)}>{order.customerPhone}</TableCell>
                <TableCell align="center" onClick={() => setModal(true)}>{order.deleveryAddress || "-"}</TableCell>
                <TableCell align="center" onClick={() => setModal(true)}>{order.orderDate.toString()}</TableCell>
                <TableCell align="center" onClick={() => setModal(true)}>{order.ended ? t("ended") : order.cancled?.status ? t("canceled") : t("pending")}</TableCell>
                <TableCell align="center" onClick={() => setModal(true)}>{t("egp", { price: order.totalPrice })}</TableCell>

                <TableCell>
                    <IconButton onClick={() => setDetails(!details)}>
                        <FaArrowDown />
                    </IconButton>
                </TableCell>
            </TableRow>

            {
                details && (
                    <TableRow>
                        <TableCell colSpan={6} >
                            <Paper variant="outlined">
                                <ProductsTable products={order.products} />
                            </Paper>
                        </TableCell>
                    </TableRow>
                )
            }

            {
                (modal && !order.ended && !order.cancled?.status) && (
                    <Modal open onClose={() => setModal(false)}>
                        <Box className="flex flex-col gap-7">
                            <Box className="flex flex-col gap-3">
                                <Typography variant="h6">{t("is ended")}</Typography>
                                <Typography color="orange" className="text-center">{t("mark as ended alert")}</Typography>
                            </Box>
                            <Button color={"success"} onClick={onClickEnd}>{t("ended confirm")}</Button>
                            <Button color={"error"} onClick={onCancel}>{t("cancel order")}</Button>
                        </Box>
                    </Modal>
                )
            }
        </>
    )
}