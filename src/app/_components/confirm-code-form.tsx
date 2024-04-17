'use client';
import ConfirmSignupButton from "./confirm-signup-button";
import { verifyCode } from "../_actions/standard-login";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";

export default function ConfirmCodeForm({ id }: { id: string }) {
    const t = useTranslations("Signup");
    const [error, setError] = useState("");
    const onSubmit = async (data: FormData) => {
        // append the id of the user to the data
        data.append("id", id);


        // send the request
        const result = await verifyCode(data);

        // handling the response
        switch (result) {
            case 400:
                setError(t("invalid-code"));
                break;
        }


    }
    useEffect(() => {
        if (error) setTimeout(() => {
            setError("")
        }, 5000);
    }, [error]);

    return (
        <form className="flex flex-col w-full items-center gap-10" action={onSubmit}>
            <h1 className="text-stone-700 font-medium text-center">{t("enter-code-title")}</h1>
            <input name="code" type="text" placeholder={t("code-input")} className="w-full bg-gray-100 p-2 px-3 rounded" />
            {
                error && <p className="text-red-500 text-center">{error}</p>
            }
            <ConfirmSignupButton />
        </form>
    )
}