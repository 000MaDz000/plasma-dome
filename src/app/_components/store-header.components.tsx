'use client';
import { IconButton, InputAdornment, Tooltip, Input } from "@mui/material";
import { BiSearch } from "react-icons/bi";
import { FaMotorcycle } from "react-icons/fa";
import StoreCartIcon from "./store-cart-icon";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { KeyboardEventHandler, useRef } from "react";

export default function StoreHeaderComponents() {
    const t = useTranslations("Store.header")
    const input = useRef<HTMLInputElement>(null);
    const router = useRouter();

    const handleSearch: KeyboardEventHandler<HTMLInputElement> = (e) => {
        if (!input.current || !input.current.value || e.key !== "Enter") return;

        const params = new URLSearchParams();
        params.set("search", input.current.value);
        console.log(params);

        router.push("/products?" + params.toString());
    }

    return (
        <>
            <StoreCartIcon />

            <Tooltip title={t("your orders")}>
                <IconButton>
                    <FaMotorcycle />
                </IconButton>
            </Tooltip>


            <Input
                startAdornment={(
                    <InputAdornment position="start">
                        <BiSearch />
                    </InputAdornment>
                )}
                inputRef={input}
                placeholder={t("searchPlaceholder")}
                onKeyDown={handleSearch}
            />
        </>
    )
}