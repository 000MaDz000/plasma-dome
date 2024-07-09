'use client';

import { Button, Grid, Skeleton, Typography } from "@mui/material";
import { useEffect, useMemo, useState } from "react";
import getCartData, { ICartProduct } from "../_actions/get-cart-data";
import CartProduct from "./cart-product";
import { useTranslations } from "next-intl";
import Modal from "./modal";
import Link from "next/link";


export default function CartModal({ open, onClose }: { open: boolean, onClose: () => void }) {
    const [cartData, setCartData] = useState<ICartProduct[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    const totalPrice = useMemo(() => {
        let total = 0;
        for (let product of cartData) {
            const discount = product.discount ? product.price * product.discount / 100 : 0;
            total += (product.price - discount) * product.quantity;
        }
        return total;
    }, [cartData]);

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
                    <Grid className="grid lg:grid-cols-2 gap-3 max-h-[50vh] overflow-y-auto">

                        {
                            cartData.length ? cartData.map((product) => (
                                <CartProduct product={product} onUpdate={() => setIsLoading(true)} />
                            )) : (
                                <Typography>{t("empty cart")}</Typography>
                            )
                        }
                    </Grid>

                    <div className="m-3 flex justify-between">
                        <Button disabled={cartData.length === 0}>
                            <Link href="/orders/create">
                                {t("confirm order")}
                            </Link>
                        </Button>

                        <Typography color={"green"}>{t("egp", { price: totalPrice })}</Typography>
                    </div>
                </Modal>
            )
    )
}