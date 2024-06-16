'use client';

import { Typography, Button } from "@mui/material";
import { FaCartArrowDown } from "react-icons/fa";
import AddToCart from "../_actions/add-to-cart";
import { useTranslations } from "next-intl";

export default function AddToCartButton({ productId }: { productId: string }) {
    const t = useTranslations("Store");

    const addProduct = async () => {
        const res = await AddToCart(productId);
        console.log(res);
    }

    return (
        <Button startIcon={<FaCartArrowDown />} onClick={addProduct}>
            <Typography>{t("body.product.addToCart")}</Typography>
        </Button>
    )
}