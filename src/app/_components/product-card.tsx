import { IImage } from "@/models/image";
import { IProduct } from "@/models/product";
import { Box, Card, CardActions, CardContent, CardMedia, Typography } from "@mui/material";
import { getTranslations } from "next-intl/server";
import AddToCartButton from "./add-to-cart-button";
import Link from "next/link";


export default async function ProductCard({ isAddedToCart, product }: { isAddedToCart?: boolean, product: IProduct }) {
    const t = await getTranslations("Store");

    return (
        <Link href={"/store/products/" + product._id}>
            <Card className="shadow-lg hover:border-gray-200 border-transparent border transition-colors flex justify-between flex-col cursor-pointer">
                <Box className="flex flex-col">
                    <CardMedia>
                        <img src={((product.images[0] as unknown as IImage).relativeUrl.toString() || "") as string} alt="" className="w-full h-40" />
                    </CardMedia>

                    <CardContent className="flex flex-col">
                        <Typography className=" [&>span]:text-green-800" variant="subtitle1"> <span className="line-clamp-2">{product.name}</span></Typography>
                    </CardContent>
                </Box>


                <CardActions className="flex flex-col cursor-auto">
                    <Typography color={"green"} >{product.price} EGP</Typography>
                    <AddToCartButton productId={product._id.toString()} />
                </CardActions>
            </Card>
        </Link>
    )
}

