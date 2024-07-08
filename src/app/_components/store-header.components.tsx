'use client';
import { IconButton, InputAdornment, Tooltip, Input } from "@mui/material";
import { BiSearch } from "react-icons/bi";
import { FaMotorcycle } from "react-icons/fa";
import StoreCartIcon from "./store-cart-icon";
import { useTranslations } from "next-intl";
import { useRouter, useSearchParams } from "next/navigation";
import { KeyboardEventHandler, useRef } from "react";
import UserIcon from "./user-icon";
import LanguageIcon from "./language-icon";

export default function StoreHeaderComponents() {
    const t = useTranslations("Store.header")
    const input = useRef<HTMLInputElement>(null);
    const router = useRouter();
    const searchParams = useSearchParams();

    const handleSearch: KeyboardEventHandler<HTMLInputElement> = (e) => {
        if (e.key !== "Enter") return;
        else if (!input.current || !input.current.value) {
            if (location.href.includes("products")) {
                router.push("/store");
            }
            return;
        }

        const params = new URLSearchParams();
        params.set("search", input.current.value);
        console.log(params);

        router.push("/products?" + params.toString());
    }

    return (
        <>
            <LanguageIcon />
            <StoreCartIcon />



            <UserIcon />
            <Input
                startAdornment={(
                    <InputAdornment position="start">
                        <BiSearch />
                    </InputAdornment>
                )}
                inputRef={input}
                placeholder={t("searchPlaceholder")}
                onKeyDown={handleSearch}
                defaultValue={searchParams.get("search")}
            />
        </>
    )
}