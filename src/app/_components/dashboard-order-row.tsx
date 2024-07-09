'use client';
import { IOrder, IOrderStatus } from "@/models/order";
import { FormControl, IconButton, MenuItem, Paper, Select, TableCell, TableRow } from "@mui/material";
import { useTranslations } from "next-intl";
import { useMemo, useState } from "react";
import { FaArrowDown } from "react-icons/fa";
import ProductsTable from "./products-table";
import { OrdersApi } from "../_classes/api";

export default function DashboardOrderRow({ order, onChangeStatus, userAlertsRole }: { order: IOrder, userAlertsRole?: "admin" | "employee" | "customer", onChangeStatus: (status: IOrderStatus) => void }) {
    const t = useTranslations("Dashboard.orders");
    const [details, setDetails] = useState(false);
    const [modal, setModal] = useState(false);
    const api = useMemo(() => new OrdersApi(), []);

    const changeStatus = async (status: IOrderStatus) => {
        const code = await api.updateStatus(order._id, status);
        if (code == 200) {
            onChangeStatus(status);
        }
        else {
            // error
        }
    }

    return (
        <>
            <TableRow hover className="cursor-pointer">
                <TableCell align="center" onClick={() => setModal(true)}>{order.customerName}</TableCell>
                <TableCell align="center" onClick={() => setModal(true)}>{order.customerPhone}</TableCell>
                <TableCell align="center" onClick={() => setModal(true)}>{order.deleveryAddress || "-"}</TableCell>
                <TableCell align="center" onClick={() => setModal(true)}>{order.orderDate.toString()}</TableCell>
                <TableCell align="center" onClick={() => setModal(true)}>
                    <Select value={order.status || "pending"} onChange={(e) => changeStatus(e.target.value as IOrderStatus)}>

                        {(userAlertsRole == "admin" || userAlertsRole == "employee") ? (
                            <>
                                <MenuItem value={"pending"}>{t("status.pending")}</MenuItem>
                                <MenuItem value={"shipped"}>{t("status.shipped")}</MenuItem>
                                <MenuItem value={"completed"}>{t("status.completed")}</MenuItem>
                                <MenuItem value={"cancelled"}>{t("status.cancelled")}</MenuItem>
                            </>
                        ) : (
                            <MenuItem value={order.status} >{t("status." + order.status)}</MenuItem>
                        )}
                    </Select>
                </TableCell>
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
                                <ProductsTable products={order.products} userAlertsRole={userAlertsRole} />
                            </Paper>
                        </TableCell>
                    </TableRow>
                )
            }

            {/* {
                (modal && !order.ended && !order.cancled?.status) && (
                    <Modal open onClose={() => setModal(false)}>
                        <Box className="flex flex-col gap-7">
                            <Box className="flex flex-col gap-3">

                                {userAlertsRole == "customer" && <Typography variant="h6">{t("are you sure")}</Typography>}
                                {(userAlertsRole == "admin" || userAlertsRole == "employee") && <Typography variant="h6">{t("is ended")}</Typography>}
                                {(userAlertsRole == "admin" || userAlertsRole == "employee") && <Typography color="orange" className="text-center">{t("mark as ended alert")}</Typography>}
                            </Box>

                            {(userAlertsRole == "admin" || userAlertsRole == "employee") && <Button color={"success"} onClick={onClickEnd}>{t("ended confirm")}</Button>}
                            <Button color={"error"} onClick={onCancel}>{t("cancel order")}</Button>
                        </Box>
                    </Modal>
                )
            } */}
        </>
    )
}