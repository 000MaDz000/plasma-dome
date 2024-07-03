'use client';

import { IUser } from "@/models/user";
import { Button, Skeleton, Table, TableBody, TableCell, TableHead, TableRow, Typography } from "@mui/material";
import { useContext, useEffect, useMemo, useState } from "react";
import Users from "../_contexts/users";
import { useTranslations } from "next-intl";
import UsersTableRow from "./users-table-row";
type DragElementData = {
    name: string;
    phone: string;
    country: string;
    role: string;
}

export default function UsersTable({ role }: { role: "admins" | "customers" | "employees" }) {
    const data = useContext(Users)[role];
    const users = data.data;
    const { increase, replaceRole } = data;
    const t = useTranslations("Dashboard.users.table");
    const [pending, setPending] = useState(true);


    useEffect(() => {
        if (!pending) return;
        increase();
        setPending(false);
    }, [pending]);

    return (
        <>
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

                <TableBody >
                    {
                        users.map(user => <UsersTableRow user={user} key={(user as any)._id} replaceRole={replaceRole as any} />)
                    }
                </TableBody>

            </Table>
            {pending && (
                <>
                    <Skeleton className="p-3" />
                    <Skeleton className="p-3" />
                    <Skeleton className="p-3" />
                </>
            )}

            {
                (!pending && !users.length) && <Typography variant="h6" textAlign={"center"} margin={7}>{t("no data")}</Typography>
            }
            <Button className="m-9" fullWidth onClick={() => setPending(true)} disabled={!pending && !users.length}>{t("show more")}</Button>
        </>
    )
}