'use client';

import { IUser } from "@/models/user";
import { Table, TableBody, TableCell, TableHead, TableRow } from "@mui/material";
import { useEffect, useMemo, useState } from "react";
import { Users } from "../_classes/api";
import { useTranslations } from "next-intl";
import { FaUser } from "react-icons/fa";

export default function UsersTable({ role }: { role?: "admin" | "customers" | "employee" }) {
    const [customers, setCustomers] = useState<IUser[]>([]);
    const api = useMemo(() => new Users(), []);
    const t = useTranslations("Dashboard.customers.table");

    useEffect(() => {
        switch (role) {
            case "customers":
                api.fetchCustomers().then(setCustomers);
                break;
            case "admin":
                break;

            case "employee":
                break;

        }
    }, []);

    return (
        <Table>
            <TableHead>
                <TableRow>
                    <TableCell align="center"></TableCell>
                    <TableCell align="center">{t("name")}</TableCell>
                    <TableCell align="center">{t("phone")}</TableCell>
                    <TableCell align="center">{t("country")}</TableCell>
                    <TableCell align="center">{t("role")}</TableCell>
                </TableRow>
            </TableHead>

            <TableBody>
                {
                    customers.map(customer => {
                        let permission = "customer";

                        for (let p of customer.permissions) {
                            if (p.name == "admin") {
                                permission = "admin";
                            }
                            else if (p.name == "employee" && permission !== "admin") {
                                permission = "employee";
                            }
                        }

                        return (
                            <TableRow hover>
                                <TableCell align="center">
                                    <FaUser size={"2rem"} />
                                </TableCell>
                                <TableCell align="center">{customer.name}</TableCell>
                                <TableCell align="center">{customer.mobile}</TableCell>
                                <TableCell align="center">{(customer as any).country ? (customer as any).country : "unkown"}</TableCell>
                                <TableCell align="center">{t("permissions." + permission)}</TableCell>
                            </TableRow>
                        )
                    })
                }
            </TableBody>
        </Table>
    )
}