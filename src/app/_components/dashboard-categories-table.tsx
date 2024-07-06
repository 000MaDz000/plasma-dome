'use client';

import { ISetting } from "@/models/settings";
import { Box, Button, IconButton, Input, Table, TableBody, TableCell, TableHead, TableRow, Typography } from "@mui/material";
import { useTranslations } from "next-intl";
import { useRef, useState } from "react";
import { FaPlus, FaTrash } from "react-icons/fa";
import Modal from "./modal";
import setSetting from "../_actions/set-setting";

export default function DashboardCategoriesTable(props: { data: ISetting, noDataMessage: string, title: string, onAdd: (name: string) => void }) {
    const t = useTranslations("Dashboard.recommendations");
    const [data, setData] = useState(props.data.value);
    const [modal, setModal] = useState(false);
    const [modalErr, setModalErr] = useState("");
    const ref = useRef<HTMLInputElement>(null);

    const handleCreateCategory = async () => {
        const category = ref.current?.value;
        if (!category) return setModalErr("errors.no category provided");

        const alreadyExists = data.find(val => val === category);
        if (alreadyExists) return setModalErr("errors.already exists");

        const newData = [...data, category];
        const res = await setSetting(props.data.name, newData);
        if (res == 400) setModalErr("errors.permission denied");

        setData(newData);
        setModal(false);
    }

    const deleteCategory = async (category: string) => {
        const alreadyExists = data.find(val => val === category);
        if (!alreadyExists) return setModalErr("errors.not exists");

        const newValue = data.filter(val => val !== category);
        const res = await setSetting(props.data.name, newValue);
        if (res == 400) setModalErr("errors.permission denied");

        setData(newValue);
        setModal(false);

    };

    return (
        <>

            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell align="center">{t("id")}</TableCell>
                        <TableCell align="center">{t("category")}</TableCell>
                        <TableCell align="center"></TableCell>
                    </TableRow>
                </TableHead>

                <TableBody>
                    {data.map((category, i) => (
                        <TableRow key={category}>
                            <TableCell align="center" >{i + 1}</TableCell>
                            <TableCell align="center" >{category}</TableCell>
                            <TableCell align="center">
                                <IconButton color="error" onClick={() => deleteCategory(category)}>
                                    <FaTrash />
                                </IconButton>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>

            {!data.length && (
                <Typography textAlign={"center"}>{props.noDataMessage}</Typography>
            )}

            <Box className="flex justify-start">
                <IconButton color="secondary" onClick={() => setModal(true)}>
                    <FaPlus />
                </IconButton>
            </Box>


            {modal && (
                <Modal onClose={() => setModal(false)} open>
                    <div className="flex flex-col gap-3">
                        <Typography>{props.title}</Typography>
                        <Input fullWidth placeholder={t("category")} inputRef={ref} onChange={() => modalErr ? setModalErr("") : ""}></Input>
                        {modalErr && <Typography color="red">{t(modalErr)}</Typography>}
                        <Button onClick={handleCreateCategory}>{t("confirm")}</Button>
                    </div>
                </Modal>
            )}
        </>
    )
}