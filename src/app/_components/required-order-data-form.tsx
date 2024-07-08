'use client';

import { Button, TextField, Typography } from "@mui/material";
import { useTranslations } from "next-intl";
import { setOrderData } from "../_actions/order";
import { useState } from "react";
import { IOrder } from "@/models/order";

export default function RequiredOrderDataForm({ onOrderCreated, disabled }: { onOrderCreated: (data: IOrder) => void, disabled: boolean }) {
    const t = useTranslations("Store.body.order");
    const [isCode, setIsCode] = useState(false);
    const [codeErr, setCodeErr] = useState(false);
    const [orderErr, setOrderErr] = useState(false);


    const onConfirm = async (data: FormData) => {

        // if (!isCode) {
        //     let err = await setOrderData(data);

        //     if (err === 400) {
        //         setOrderErr(true);
        //         return;
        //     }

        //     setIsCode(true);

        //     return;
        // }

        // const res = await createOrder(data.get("code")?.toString() || "");
        // if (res === 400) setCodeErr(true);

        // if (typeof res !== "number") {
        //     onOrderCreated(res);
        // }

    };



    if (isCode) {
        return (
            <form className="flex flex-col gap-5" action={onConfirm}>
                <Typography variant="h5">{t("fill fields")}</Typography>
                {codeErr && <Typography color={"red"}>{t("invalid code")}</Typography>}
                <TextField name="code" placeholder={t("code")} color={codeErr ? "error" : undefined} focused={codeErr} />
                <Button type="submit">{t("confirm data")}</Button>
            </form>
        )
    }
    return (
        <form className="flex flex-col gap-5" action={onConfirm}>
            <Typography variant="h5">{t("fill fields")}</Typography>
            <TextField disabled={disabled} name="name" placeholder={t("name")} color={orderErr ? "error" : undefined} focused={orderErr} />
            <TextField disabled={disabled} name="mobile" placeholder={t("mobile")} color={orderErr ? "error" : undefined} focused={orderErr} />
            <Button disabled={disabled} type="submit">{t("confirm data")}</Button>
        </form>
    )
}