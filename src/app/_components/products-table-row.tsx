'use client';

import { Autocomplete, Box, Button, FormControl, FormControlLabel, IconButton, InputLabel, TableCell, TableContainer, TableRow, TextareaAutosize, TextField } from "@mui/material";
import { useTranslations } from "next-intl";
import { useRef, useState } from "react";
import { ICartProduct } from "../_actions/get-cart-data";
import Modal from "./modal";
import { BiXCircle } from "react-icons/bi";
import { ProductsApi } from "../_classes/api";
import { FaTrash } from "react-icons/fa";

export default function productsTableRow(props: { product: ICartProduct, systemCategories: string[], api: ProductsApi, changeModal?: boolean }) {
    const t = useTranslations("Dashboard");
    const [modalState, setModalState] = useState(false);
    const [product, setProduct] = useState(props.product);
    const ref = useRef<HTMLInputElement>(null);
    const nameRef = useRef<HTMLInputElement>(null);
    const priceRef = useRef<HTMLInputElement>(null);
    const discountRef = useRef<HTMLInputElement>(null);
    const descriptionRef = useRef<HTMLTextAreaElement>(null);
    const api = props.api;

    const addCategory = async (category: string) => {
        const exists = product.categories.find(val => val === category);
        if (exists) return;

        const updatedCategories = [...product.categories, category];
        const res = await api.updateCategories(product._id, updatedCategories);
        if (res === 200) {
            setProduct({ ...product, categories: updatedCategories });
        }
        else {
            console.log("err");

            // set the erro
        }
    }

    const removeCategory = async (category: string) => {
        const filteredCategories = product.categories.filter(val => val !== category);
        const res = await api.updateCategories(product._id, filteredCategories);
        if (res === 200) {
            setProduct({ ...product, categories: filteredCategories });
        }
        else {
            // set the erro
        }
    }

    const updateData = async () => {
        const data = {
            name: nameRef.current?.value || undefined,
            price: priceRef.current?.value || undefined,
            discount: discountRef.current?.value || undefined,
            description: descriptionRef.current?.value || undefined,
        }
        if (!data.name) delete data.name;
        if (!data.price) delete data.price;
        if (!data.discount) delete data.discount;
        if (!data.description) delete data.description;

        const res = await api.updateData(product._id, data);

        if (res === 200) {
            setProduct({ ...product, ...data as any });
            setModalState(false)
        }
        else {
            // error
            console.log("err");
        }
    };


    return (
        <>
            <TableRow hover >
                <TableCell onClick={() => setModalState(true)}><img src={product.images[0]} className="w-16" /></TableCell>
                <TableCell onClick={() => setModalState(true)}>{product.name}</TableCell>
                <TableCell onClick={() => setModalState(true)}>{product.categories.map(v => v + ", ")}</TableCell>
                <TableCell onClick={() => setModalState(true)}>{product.description}</TableCell>
                <TableCell onClick={() => setModalState(true)}>{product.price}</TableCell>
                <TableCell onClick={() => setModalState(true)}>{(product as any).discount ? t("products.discount persent", { discount: (product as any).discount }) : 0}</TableCell>
                <TableCell onClick={() => setModalState(true)}>{(product as any).discount ? product.price - ((product.price * (product as any).discount) / 100) : product.price}</TableCell>
                <TableCell>
                    <IconButton onClick={() => console.log("coming soon")}>
                        <FaTrash />
                    </IconButton>
                </TableCell>
            </TableRow>

            {
                props.changeModal !== false && (

                    <Modal open={modalState} onClose={() => setModalState(false)}>
                        <div className="flex flex-col gap-7">
                            {/* categories edit */}
                            <Box>
                                <Box className="grid grid-cols-[repeat(auto-fill,minmax(6rem,1fr))] grid-rows-[repeat(auto-fit,1fr)] gap-3">
                                    {product.categories.map(category => (
                                        <Box className="mb-4 bg-gray-200 p-3 flex flex-col" key={category}>
                                            <Box className="flex justify-end">
                                                <IconButton color="error" size="small" onClick={() => removeCategory(category)}>
                                                    <BiXCircle />
                                                </IconButton>

                                            </Box>

                                            <Box>{category}</Box>
                                        </Box>
                                    ))}
                                </Box>

                                <Autocomplete disabled={false} options={props.systemCategories} renderInput={(p) => (
                                    <Box className="flex flex-col gap-4">
                                        <TextField {...p} placeholder={t("recommendations.category")} inputRef={ref} />
                                        <Button fullWidth variant="contained" onClick={() => addCategory(ref.current?.value as string)}>{t("add")}</Button>
                                    </Box>
                                )}>

                                </Autocomplete>
                            </Box>

                            <Box className="flex flex-col gap-3">
                                <TextField variant="outlined" name="name" placeholder={t("products.name")} inputRef={nameRef} defaultValue={product.name} label={t("products.name")} />
                                <TextField variant="outlined" name="price" placeholder={t("products.price")} inputRef={priceRef} defaultValue={product.price} label={t("products.price")} />
                                <TextField variant="outlined" name="discount" placeholder={t("products.discount")} inputRef={discountRef} defaultValue={(product as any).discount} label={t("products.discount")} />
                                <TextareaAutosize name="description" placeholder={t("products.description")} ref={descriptionRef} defaultValue={product.description} className="min-h-24 p-2 border" />
                                <Button onClick={updateData}>{t("products.submit edit")}</Button>
                            </Box>

                        </div>
                    </Modal>
                )
            }
        </>
    )
}