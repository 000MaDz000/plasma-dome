'use client';
import getCartData, { ICartProduct } from "@/app/_actions/get-cart-data";
import CartProductsTable from "@/app/_components/cart-products-table";
import Header from "@/app/_components/header";
import RequiredOrderDataForm from "@/app/_components/required-order-data-form";
import { Box, Container, Paper, Typography } from "@mui/material";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";

export default function CreateOrderPage() {
    const t = useTranslations("Store.body.order");

    const [data, setData] = useState<ICartProduct[]>([]);
    const [pending, setPending] = useState(true);

    useEffect(() => {
        if (!pending) return;

        getCartData().then(cart => {
            setData([...data, ...cart]);
            setPending(false);
        });

    }, [pending]);

    return (
        <div className="flex flex-col gap-3">
            <Paper>
                <Header className="bg-none bg-white">

                </Header>
            </Paper>

            <Container>
                <Box className="flex flex-col gap-5">
                    <Paper className="p-7 overflow-x-auto">
                        <Typography variant="h5" my={5}>{t("cart orders")}</Typography>
                        <CartProductsTable pending={pending} data={data} />
                    </Paper>


                    <RequiredOrderDataForm onOrderCreated={(o) => console.log(o)} disabled={data.length === 0} />
                </Box>
            </Container>
        </div>
    )
}