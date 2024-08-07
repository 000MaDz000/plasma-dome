import { Paper, Typography } from "@mui/material";
import { ICartProduct } from "../_actions/get-cart-data";
import ProductCard from "./product-card";
import ScrollLeftRightButtons from "./scroll-left-right-buttons";
import { useId } from "react";
type PropsType = Omit<ICartProduct, "quantity">[];

export default function ProductsScrollableRow({ products, title }: { products: PropsType, title?: string }) {
    const id = useId();

    return (
        <div className="relative my-7">
            <Paper className="p-7">
                <Typography variant="h5" mb={3} className="capitalize" fontFamily={"sans-serif"} >{title}</Typography>
                <div className="flex gap-4 overflow-x-auto md:overflow-x-hidden" id={id} >
                    {products.map(product => <ProductCard product={product} key={product._id} hideAddToCart />)}
                </div>
            </Paper>

            <ScrollLeftRightButtons parentId={id} />
        </div>
    )
}