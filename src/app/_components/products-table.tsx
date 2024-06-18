'use client';

import { Box, Button, Skeleton, Table, TableBody, TableCell, TableHead, TableRow } from "@mui/material";
import { useTranslations } from "next-intl";
import { useEffect, useMemo, useState } from "react";
import { ProductsApi } from "../_classes/api";
import { ICartProduct } from "../_actions/get-cart-data";
import ProductsTableRow from "./products-table-row";

export default function ProductsTable() {
    const t = useTranslations("Dashboard.products");
    const [data, setData] = useState<ICartProduct[]>([]);
    const [isPending, setIsPending] = useState(true);
    const api = useMemo(() => new ProductsApi(), []);

    useEffect(() => {
        if (isPending) {
            api.fetchProducts().then(prod => {
                setData([...data, ...prod]);
            });
            setIsPending(false);
        }
    }, [isPending]);

    return (
        <Box>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>{t("images")}</TableCell>
                        <TableCell>{t("name")}</TableCell>
                        <TableCell>{t("categories")}</TableCell>
                        <TableCell>{t("description")}</TableCell>
                        <TableCell>{t("price")}</TableCell>
                    </TableRow>
                </TableHead>

                <TableBody>
                    {data.map((p) => <ProductsTableRow product={p} />)}

                </TableBody>
            </Table>

            {
                isPending ? (
                    <>
                        <Skeleton className="p-3 mx-3"></Skeleton>
                        <Skeleton className="p-3 mx-3"></Skeleton>
                        <Skeleton className="p-3 mx-3"></Skeleton>
                    </>
                ) : null
            }

            <Button className="p-3" fullWidth onClick={() => setIsPending(true)}>{t("show more")}</Button>
        </Box>
    )
}