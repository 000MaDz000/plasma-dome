'use client';

import { Button, TextareaAutosize, Typography } from "@mui/material";
import { useTranslations } from "next-intl";
import { IOrder } from "@/models/order";

export default function RequiredOrderDataForm({ disabled }: { onOrderCreated: (data: IOrder) => void, disabled: boolean }) {
    const t = useTranslations("Store.body.order");


    return (
        <form className="flex flex-col gap-5" action={"/api/dashboard/orders/"} method="post">
            <Typography variant="h5">{t("fill fields")}</Typography>
            <TextareaAutosize disabled={disabled} name="location" placeholder={t("location")} autoFocus className="min-h-28 p-6 border" />
            <Button disabled={disabled} type="submit">{t("confirm data")}</Button>
        </form>
    )
}