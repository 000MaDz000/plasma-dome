import { IImage } from "@/models/image";
import { Box, Card, CardActions, CardContent, CardMedia, Typography } from "@mui/material";
import { getLocale, getTranslations } from "next-intl/server";
import AddToCartButton from "./add-to-cart-button";
import Link from "next/link";
import { ICartProduct } from "../_actions/get-cart-data";


export default async function ProductCard({ isAddedToCart, product, hideAddToCart }: { isAddedToCart?: boolean, product: Omit<ICartProduct, "quantity">, hideAddToCart?: boolean }) {
    const t = await getTranslations("Store");
    const locale = await getLocale();
    return (
        <Card className="shadow-lg hover:border-gray-200 border-transparent border transition-colors flex justify-between flex-col cursor-pointer min-w-56">
            <Link href={"/" + locale + "/products/" + product._id} >
                <Box className="flex flex-col">
                    <CardMedia >
                        <Box className="flex justify-center">
                            <img src={((product.images[0] as unknown as IImage).relativeUrl.toString() || "") as string} alt="" className="max-w-full h-40" />
                        </Box>
                    </CardMedia>

                    <CardContent className="flex flex-col">
                        <Typography className=" [&>span]:text-green-800" variant="subtitle1"> <span className="line-clamp-2">{product.name}</span></Typography>
                    </CardContent>
                </Box>
            </Link>


            <CardActions className="flex flex-col cursor-auto">
                <Typography className={product.discount ? "text-red-500 line line-through" : "text-green-600"}>{product.price} EGP</Typography>
                {product.discount && (
                    <Typography className="text-green-600">{t("body.product.egp", { price: product.price - ((product.price * product.discount) / product.price) })}</Typography>
                )}
                {
                    !hideAddToCart &&
                    <AddToCartButton productId={product._id.toString()} />
                }
            </CardActions>
        </Card>
    )
}

