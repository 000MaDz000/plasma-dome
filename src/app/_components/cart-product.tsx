'use client';
import { Card, CardContent, CardMedia, Typography, CardActions, IconButton, Tooltip, TextField, Button, Box } from "@mui/material";
import { DeleteFromCart, ICartProduct, UpdateQuantity } from "../_actions/get-cart-data";
import { useTranslations } from "next-intl";
import { BiEdit, BiTrash } from "react-icons/bi";
import { useState } from "react";
import Modal from "./modal";

export default function CartProduct({ product, onUpdate }: { product: ICartProduct, onUpdate: () => void }) {
    const t = useTranslations("Store.body.product");
    const [isUpdate, setIsUpdate] = useState(false);
    const [changeQuantity, setChangeQuantity] = useState("");
    const discount = product.discount ? product.price * product.discount / 100 : 0;
    const totalPiece = product.price - discount;

    const removeFromCart = async () => {
        await DeleteFromCart(product._id);
        onUpdate();
    }

    const onUpdateQuantity = async () => {
        await UpdateQuantity(product._id, parseInt(changeQuantity));
        onUpdate();
    }

    return (
        <Card className="flex flex-col justify-between">

            <div>
                <CardMedia >
                    <img src={product.images[0]} alt="" />
                </CardMedia>

                <CardContent>
                    <Typography className="flex justify-between ">{t("name")}: <span>{product.name}</span></Typography>
                    <Typography className="flex justify-between ">{t("price")}:<span>{t("egp", { price: product.price })}</span></Typography>
                    {
                        product.discount && (
                            <Typography className="flex justify-between ">{t("discount")}:<span>{t("egp", { price: discount })}</span></Typography>
                        )
                    }
                    <Typography className="flex justify-between ">{t("quantity")}: <span>{product.quantity}</span></Typography>
                    <Typography className="flex justify-between ">{t("total")}: <span>{t("egp", { price: totalPiece * product.quantity })}</span></Typography>
                </CardContent>
            </div>

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