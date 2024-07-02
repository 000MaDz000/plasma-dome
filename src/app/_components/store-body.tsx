import { Container } from "@mui/material";
import ProductCard from "./product-card";
import { Product } from "../_classes/models";
import ProductsScrollableRow from "./products-scrollable-row";

export default async function StoreBody() {
    const products = await Product.find({}).limit(20).populate("images");

    return (
        <Container maxWidth="xl" className="mt-5">
            <div className="flex flex-col gap-7">

                <ProductsScrollableRow products={products as any} title="paints" />
                <div className="grid sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2 grid-cols-2">
                    <>
                        {products.map(product => (
                            <ProductCard product={product as any} key={product._id.toString()} />
                        ))}
                    </>
                </div>
            </div>
        </Container>
    )
}

// image: 666e18f9984dde9af75e981b
// product: 65fafa7e5c4a466ced23db57