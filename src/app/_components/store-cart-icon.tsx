'use client';
import { IconButton, Modal, Tooltip } from "@mui/material";
import { FaShoppingCart } from "react-icons/fa";
import { useTranslations } from "next-intl";
import { useState } from "react";
import CartModal from "./cart-modal";

export default function StoreCartIcon() {
    const t = useTranslations("Store.header");
    const [open, setIsOpen] = useState(false);

    return (
        <>
            <Tooltip title={t("your cart")}>
                {/* <Typography color={"green"} className=" text-sm">1</Typography> */}
                <IconButton onClick={() => setIsOpen(true)}>
                    <FaShoppingCart />
                </IconButton>
            </Tooltip>

            {open && <CartModal open onClose={() => setIsOpen(false)} />}
        </>
    )
}