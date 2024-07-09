'use client';

import { useState, useEffect } from "react";
import getCartData, { ICartProduct } from "../_actions/get-cart-data";
import { Skeleton, Table, TableBody, TableCell, TableHead, TableRow } from "@mui/material";
import { useTranslations } from "next-intl";

export default function CreateOrderPage({ setDisabled }: { setDisabled?: (val: boolean) => void }) {
    const [data, setData] = useState<ICartProduct[]>([]);
    const [pending, setPending] = useState(true);
    const [discount, setDiscount] = useState(0);
    const t = useTranslations("Store.body.product")


    useEffect(() => {
        if (!pending) return;

        getCartData().then(cart => {
            let totalDiscount = 0;

            setData([...data, ...cart.map(v => {
                if (v.discount) {
                    let discountValue = (v.price * v.discount / 100);
                    totalDiscount += discountValue;
                }
                return v;
            })]);

            setPending(false);
            if (totalDiscount) setDiscount(totalDiscount);
        });

    }, [pending]);

    if (!pending) {
        if (data.length && setDisabled) {
            setDisabled(false);
        }
    }

    return (
        <>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>{t("image")}</TableCell>
                        <TableCell>{t("name")}</TableCell>
                        <TableCell>{t("price")}</TableCell>
                        {discount && <TableCell>{t("discount")}</TableCell>}
                        <TableCell>{t("quantity")}</TableCell>
                        <TableCell>{t("total")}</TableCell>
                    </TableRow>
                </TableHead>

                <TableBody>
                    {data.map(product => (
                        <TableRow>
                            <TableCell><img src={product.images[0]} className="max-w-16" /></TableCell>
                            <TableCell>{product.name}</TableCell>
                            <TableCell>{t("egp", { price: product.price })}</TableCell>
                            {discount && (
                                product.discount ? <TableCell>{t("discount persent", { discount: product.discount })}</TableCell> : <TableCell></TableCell>
                            )}
                            <TableCell>{product.quantity}</TableCell>
                            <TableCell>{t("egp", { price: product.discount ? (product.price - (product.price * product.discount / 100)) * product.quantity : product.price * product.quantity })}</TableCell>
                        </TableRow>
                    ))}

                </TableBody>
            </Table>

            {data.length === 0 && !pending && (
                <div className="flex items-center justify-center p-4 mt-7">
                    {t("empty cart")}
                </div>
            )}

            {
                pending && (
                    <>
                        <Skeleton className="mx-4 p-4"></Skeleton>
                        <Skeleton className="mx-4 p-4"></Skeleton>
                        <Skeleton className="mx-4 p-4"></Skeleton>
                    </>
                )
            }
        </>
    )
}