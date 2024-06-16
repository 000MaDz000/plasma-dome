'use client';
import { IconButton, InputAdornment, Tooltip, Input } from "@mui/material";
import { BiSearch } from "react-icons/bi";
import { FaMotorcycle } from "react-icons/fa";
import StoreCartIcon from "./store-cart-icon";
import { useTranslations } from "next-intl";

export default function StoreHeaderComponents() {
    const t = useTranslations("Store.header")
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
                placeholder={t("searchPlaceholder")}
            />
        </>
    )
}