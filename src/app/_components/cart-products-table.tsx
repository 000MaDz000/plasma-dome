'use client';
import { Skeleton, Table, TableBody, TableCell, TableHead, TableRow } from "@mui/material";
import { useTranslations } from "next-intl";
import { ICartProduct } from "../_actions/get-cart-data";

export default function CreateOrderPage({ pending, data }: { pending: boolean, data: ICartProduct[] }) {

    const t = useTranslations("Store.body.product")

    return (
        <>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>{t("image")}</TableCell>
                        <TableCell>{t("name")}</TableCell>
                        <TableCell>{t("price")}</TableCell>
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
                            <TableCell>{product.quantity}</TableCell>
                            <TableCell>{t("egp", { price: product.price * product.quantity })}</TableCell>
                        </TableRow>
                    ))}

                </TableBody>
            </Table>

            {data.length === 0 && (
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