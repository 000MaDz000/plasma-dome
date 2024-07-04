'use client';

import { IAdvertisment } from "@/models/advertisment";
import { Skeleton, Table, TableRow, TableHead, TableCell, TableBody, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { AdvertismentApi } from "../_classes/api";
import { useTranslations } from "next-intl";

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
                        {ads.map((ad) => {
                            ad.createdAt = new Date(ad.createdAt);

                            return (
                                <TableRow>
                                    <TableCell>
                                        <img src={"/images/" + ad.images[0].slice(0, ad.images[0].lastIndexOf("."))} alt="" className="max-w-60" />
                                    </TableCell>
                                    <TableCell>{ad.createdAt.getFullYear()}/{ad.createdAt.getMonth() + 1}/{ad.createdAt.getDate()}</TableCell>
                                    <TableCell>{ad.barName}</TableCell>
                                    <TableCell>{ad.link}</TableCell>
                                    <TableCell>{ad.active ? t("active") : t("not active")}</TableCell>
                                </TableRow>
                            )
                        })}
                    </TableBody>
                </Table>

                {(!pending && !ads.length) && (
                    <Typography textAlign={"center"} margin={1}>{t("no data")}</Typography>
                )}
            </>
    )
}