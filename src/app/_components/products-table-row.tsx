'use client';

import { Autocomplete, Box, Button, IconButton, TableCell, TableRow, TextField } from "@mui/material";
import { useTranslations } from "next-intl";
import { useRef, useState } from "react";
import { ICartProduct } from "../_actions/get-cart-data";
import Modal from "./modal";
import { BiXCircle } from "react-icons/bi";
import { ProductsApi } from "../_classes/api";

export default function productsTableRow(props: { product: ICartProduct, systemCategories: string[], api: ProductsApi }) {
    const t = useTranslations("Dashboard");
    const [modalState, setModalState] = useState(false);
    const [product, setProduct] = useState(props.product);
    const ref = useRef<HTMLInputElement>(null);
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

    return (
        <>
            <TableRow hover onClick={() => setModalState(true)}>
                <TableCell><img src={product.images[0]} className="w-16" /></TableCell>
                <TableCell>{product.name}</TableCell>
                <TableCell>{product.categories.map(v => v + ", ")}</TableCell>
                <TableCell>{product.description}</TableCell>
                <TableCell>{product.price}</TableCell>
            </TableRow>

            <Modal open={modalState} onClose={() => setModalState(false)}>
                <div>
                    <Box className="grid grid-cols-[repeat(auto-fill,minmax(6rem,1fr))] grid-rows-3 gap-3">
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
                </div>
            </Modal>
        </>
    )
}