'use client';

import { IAdvertisment } from "@/models/advertisment";
import { Box, Button, FormControl, InputLabel, MenuItem, Select, TableCell, TableRow, Tooltip } from "@mui/material";
import { useTranslations } from "next-intl";
import { useState } from "react";
import Modal from "./modal";
import { AdvertismentApi } from "../_classes/api";

export default function DashboardAdRow({ ad, onDeleteAd, onChangeStatus }: { onDeleteAd: () => void, onChangeStatus: () => void, ad: Omit<IAdvertisment, "images"> & { images: string[] } }) {
    const t = useTranslations("Dashboard.ads");
    const [modal, setModal] = useState(false);
    const [status, setStatus] = useState(ad.active);
    const [selectVal, setSelectVal] = useState(status === true ? "active" : "not active");
    ad.createdAt = new Date(ad.createdAt);

    const changeStatus = async () => {
        switch (selectVal) {
            case "active":
                // don't send the requests if you don't need
                if (status) return;

                // create the api instance
                const api = new AdvertismentApi((ad as any)._id);
                const res = await api.setStatus(true); // set the status to true

                // handling the response
                if ((res as any) === 200) {
                    setStatus(true);
                }
                else {
                    // error
                }

                break;

            case "not active":
                // don't send the requests if you don't need
                if (!status) return;

                // create the api instance
                const api1 = new AdvertismentApi((ad as any)._id);
                const res1 = await api1.setStatus(false); // set the status to true

                if ((res1 as any) === 200) {
                    setStatus(false);
                }
                else {
                    // error
                }

                break;
        }

        setModal(false);
    };

    const closeModal = () => {
        setModal(false);
        // when select other state and close the modal, the other state need to be removed if it's not saved
        setSelectVal(status === true ? "active" : "not active"); // remove not saved state
    }

    return (
        <>
            <TableRow onClick={() => setModal(true)} className="cursor-pointer" hover>
                <TableCell>
                    <img src={"/images/" + ad.images[0].slice(0, ad.images[0].lastIndexOf("."))} alt="" className="max-w-60" />
                </TableCell>
                <TableCell>{ad.createdAt.getFullYear()}/{ad.createdAt.getMonth() + 1}/{ad.createdAt.getDate()}</TableCell>
                <TableCell>{ad.barName}</TableCell>
                <TableCell>{ad.link}</TableCell>
                <TableCell>{status ? t("active") : t("not active")}</TableCell>
            </TableRow>

            {
                modal && (
                    <Modal open onClose={closeModal}>
                        <div className="flex flex-col gap-7">
                            <FormControl fullWidth>
                                <InputLabel >{t("status")}</InputLabel>
                                <Select fullWidth label={t("status")} value={selectVal} onChange={(e) => setSelectVal(e.target.value)}>
                                    <MenuItem value={"active"}>{t("active")}</MenuItem>
                                    <MenuItem value={"not active"}>{t("not active")}</MenuItem>
                                </Select>
                            </FormControl>

                            <Box className="flex gap-3">
                                <Tooltip title={t("save tooltip", { value: t(selectVal) })} onClick={changeStatus}>
                                    <Button color="info" fullWidth variant="contained">{t("save changes")}</Button>
                                </Tooltip>

                                <Tooltip title={t("delete tooltip")}>
                                    <Button color="error" fullWidth variant="outlined" onClick={onDeleteAd}>{t("delete")}</Button>
                                </Tooltip>
                            </Box>
                        </div>
                    </Modal>
                )
            }
        </>
    )
}