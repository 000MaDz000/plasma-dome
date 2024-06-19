'use client';
import CartProductsTable from "@/app/_components/cart-products-table";
import Header from "@/app/_components/header";
import RequiredOrderDataForm from "@/app/_components/required-order-data-form";
import { Box, Container, Paper, Typography } from "@mui/material";
import { useTranslations } from "next-intl";
import { useState } from "react";

export default function CreateOrderPage() {
    const t = useTranslations("Store.body.order");
    const [disabled, setDisabled] = useState(true);

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
                        <CartProductsTable setDisabled={setDisabled} />
                    </Paper>


                    <RequiredOrderDataForm onOrderCreated={(o) => console.log(o)} disabled={disabled} />
                </Box>
            </Container>
        </div>
    )
}