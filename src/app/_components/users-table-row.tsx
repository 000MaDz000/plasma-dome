'use client';

import { IUser, UserPermissionName } from "@/models/user";
import { Box, Button, TableCell, TableRow, Typography } from "@mui/material";
import { useTranslations } from "next-intl";
import { FaUserCircle } from "react-icons/fa";
import getUserRole from "../_functions/get-user-role";
import { useMemo, useState } from "react";
import Modal from "./modal";

export default function UsersTableRow({ user, replaceRole }: { user: IUser, replaceRole: (user: IUser, role: UserPermissionName) => void }) {
    const t = useTranslations("Dashboard.users.table");
    const [modal, setModal] = useState(false)
    const permission = getUserRole(user);
    const isRootAdmin = useMemo(() => {
        if (permission !== "admin") return false;

        return !user.permissions.find((n) => n.name == "admin")?.granted;
    }, [user]);

    const replaceRoleWrapper = (user: IUser, role: UserPermissionName) => {
        replaceRole(user, role);
        setModal(false);
    }


    return (
        <>
            <TableRow hover onClick={() => isRootAdmin ? "" : setModal(true)} className="cursor-pointer">
                <TableCell align="center">
                    <FaUserCircle size="2rem" />
                </TableCell>
                <TableCell align="center" className="name">{user.name}</TableCell>
                <TableCell align="center" className="phone">{user.mobile}</TableCell>
                <TableCell align="center" className="country">{(user as any).country ? (user as any).country : "unkown"}</TableCell>
                <TableCell align="center" className="role">{t("permissions." + permission)}</TableCell>
            </TableRow>

            {
                modal && (
                    <Modal onClose={() => setModal(false)} open>
                        <div className="flex flex-col w-full justify-start items-start">
                            <Typography variant="h6" mb={3} mx={3}>{t("options title")}</Typography>
                        </div>

                        <Box className="flex flex-col gap-3">

                            {(permission !== "admin") && (
                                <Button fullWidth color="info" onClick={() => replaceRoleWrapper(user, "admin")}>
                                    {t("mark as admin")}
                                </Button>
                            )}

                            {(permission !== "employee") && (
                                <Button fullWidth color="warning" onClick={() => replaceRoleWrapper(user, "employee")}>
                                    {t("mark as employee")}
                                </Button>
                            )}

                            {(permission === "admin") && (
                                <Button fullWidth color="error" onClick={() => replaceRoleWrapper(user, "customer")}>{t("remove admin role")}</Button>
                            )}

                            {(permission === "employee") && (
                                <Button fullWidth color="error" onClick={() => replaceRoleWrapper(user, "customer")}>{t("remove employee role")}</Button>
                            )}


                        </Box>
                    </Modal>
                )
            }
        </>
    )
}