'use client';

import { IAdvertisment } from "@/models/advertisment";
import { Skeleton, Table, TableRow, TableHead, TableCell, TableBody, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { AdvertismentApi } from "../_classes/api";
import { useTranslations } from "next-intl";
import DashboardAdRow from "./dashboard-ad-row";

export default function DashboardAdsTable() {
    const [ads, setAds] = useState<(Omit<IAdvertisment, "images"> & { images: string[] })[]>([]);
    const [pending, setPending] = useState(true);
    const t = useTranslations("Dashboard.ads");

    useEffect(() => {
        AdvertismentApi.getAll().then((v) => {
            setAds(v);
            setPending(false);
        });
    }, []);

    const deleteAd = (ad: typeof ads[0]) => {
        const api = new AdvertismentApi((ad as any)._id);
        api.delete().then((status) => {
            if ((status as any) === 200) {
                setAds(ads.filter((val) => (val as any)._id !== (ad as any)._id));
            }
            else {
                // will create an error (coming soon)
            }
        });
    }

    return (
        pending ? <Skeleton className="h-96" /> :
            <>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell></TableCell>
                            <TableCell>{t("creation date")}</TableCell>
                            <TableCell>{t("barname")}</TableCell>
                            <TableCell>{t("redirect link")}</TableCell>
                            <TableCell>{t("status")}</TableCell>
                        </TableRow>
                    </TableHead>

                    <TableBody>
                        {ads.map((ad) => <DashboardAdRow key={(ad as any)._id} ad={ad} onChangeStatus={() => { }} onDeleteAd={() => deleteAd(ad)} />)}
                    </TableBody>
                </Table>

                {(!pending && !ads.length) && (
                    <Typography textAlign={"center"} margin={1}>{t("no data")}</Typography>
                )}
            </>
    )
}