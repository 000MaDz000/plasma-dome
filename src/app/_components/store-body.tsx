import { Container, Grid, } from "@mui/material";
import ProductCard from "./product-card";
import { Product } from "../_classes/models";

export default async function StoreBody() {
    const products = await Product.find({}).limit(20).populate("images");

    return (
        <Container maxWidth="xl" className="mt-5">
            <Grid className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
                <>
                    {products.map(product => (
                        <ProductCard product={product} key={product._id.toString()} />
                    ))}
                </>
            </Grid>
        </Container>
    )
}

// image: 666e18f9984dde9af75e981b
// product: 65fafa7e5c4a466ced23db57