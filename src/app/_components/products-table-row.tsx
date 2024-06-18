'use client';

import { TableCell, TableRow } from "@mui/material";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { ICartProduct } from "../_actions/get-cart-data";
import Modal from "./modal";

export default function productsTableRow({ product }: { product: ICartProduct }) {
    const t = useTranslations();
    const [modalState, setModalState] = useState(false);

    return (
        <>
            <TableRow hover onClick={() => setModalState(true)}>
                <TableCell><img src={product.images[0]} className="w-16" /></TableCell>
                <TableCell>{product.name}</TableCell>
                <TableCell>{product.categories}</TableCell>
                <TableCell>{product.description}</TableCell>
                <TableCell>{product.price}</TableCell>
            </TableRow>

            <Modal open={modalState} onClose={() => setModalState(false)}>
                <div>
                    hi
                </div>
            </Modal>
        </>
    )
}