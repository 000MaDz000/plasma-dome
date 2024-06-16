'use client';

import { Grid, Skeleton, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import getCartData, { ICartProduct } from "../_actions/get-cart-data";
import CartProduct from "./cart-product";
import { useTranslations } from "next-intl";
import Modal from "./modal";


export default function CartModal({ open, onClose }: { open: boolean, onClose: () => void }) {
    const [cartData, setCartData] = useState<ICartProduct[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const t = useTranslations("Store.body.product");

    useEffect(() => {
        if (isLoading) {
            getCartData().then((data) => {
                if (typeof data != "number") {
                    setIsLoading(false);
                    setCartData(data as any);
                }
            })
        }
    });

    const onDeleteFromCart = (productId: string) => {

    }

    return (
        isLoading ? (
            <Modal open onClose={() => { }}>
                <Skeleton></Skeleton>
                <Skeleton></Skeleton>
                <Skeleton></Skeleton>
            </Modal>
        )
            : (

                <Modal open={open} onClose={onClose}>
                    <Grid className="grid md:grid-cols-2">

                        {
                            cartData.length ? cartData.map((product) => (
                                <CartProduct product={product} onUpdate={() => setIsLoading(true)} />
                            )) : (
                                <Typography>{t("empty cart")}</Typography>
                            )
                        }
                    </Grid>
                </Modal>
            )
    )
}