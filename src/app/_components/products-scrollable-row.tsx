import { Paper } from "@mui/material";
import { ICartProduct } from "../_actions/get-cart-data";
import ProductCard from "./product-card";
import ScrollLeftRightButtons from "./scroll-left-right-buttons";
type PropsType = Omit<ICartProduct, "quantity">[];

export default function ProductsScrollableRow({ products }: { products: PropsType }) {
    const id = products[0]._id.toString();

    return (
        <div className="relative">
            <Paper className="p-7 overflow-x-auto md:overflow-x-hidden" id={id} >
                <div className="flex gap-4">
                    {products.map(product => <ProductCard product={product} key={product._id} />)}
                    {products.map(product => <ProductCard product={product} key={product._id} />)}
                </div>

            </Paper>
            <ScrollLeftRightButtons parentId={id} />
        </div>
    )
}