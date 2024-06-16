'use client';
import { Card, CardContent, CardMedia, Typography, CardActions, IconButton, Tooltip, TextField, Button, Box } from "@mui/material";
import { DeleteFromCart, ICartProduct, UpdateQuantity } from "../_actions/get-cart-data";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { BiEdit, BiTrash } from "react-icons/bi";
import { useState } from "react";
import Modal from "./modal";

export default function CartProduct({ product, onUpdate }: { product: ICartProduct, onUpdate: () => void }) {
    const t = useTranslations("Store.body.product");
    const [isUpdate, setIsUpdate] = useState(false);
    const [changeQuantity, setChangeQuantity] = useState("");


    const removeFromCart = async () => {
        await DeleteFromCart(product._id);
        onUpdate();
    }

    const onUpdateQuantity = async () => {
        await UpdateQuantity(product._id, parseInt(changeQuantity));
        onUpdate();
    }

    return (
        <Card>
            <CardMedia >
                <Image src={product.images[0]} width={1024} height={1024} alt="" />
            </CardMedia>

            <CardContent>
                <Typography className="flex justify-between ">{t("name")}: <span>{product.name}</span></Typography>
                <Typography className="flex justify-between ">{t("quantity")}: <span>{product.quantity}</span></Typography>
            </CardContent>

            <CardActions>
                <Tooltip title={t("update")}>
                    <IconButton onClick={() => setIsUpdate(true)}>
                        <BiEdit />
                    </IconButton>
                </Tooltip>

                <Tooltip title={t("delete")}>
                    <IconButton onClick={removeFromCart}>
                        <BiTrash />
                    </IconButton>
                </Tooltip>
            </CardActions>


            <Modal open={isUpdate} onClose={() => setIsUpdate(false)}>
                <Box className="flex flex-col gap-4">
                    <TextField type="number" fullWidth defaultValue={product.quantity} onChange={(e) => setChangeQuantity(e.target.value)} />
                    <Button fullWidth onClick={() => onUpdateQuantity()}>{t("confirm edit")}</Button>
                </Box>
            </Modal>
        </Card>
    )
}