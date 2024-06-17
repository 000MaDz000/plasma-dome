import { IImage } from "@/models/image";
import { IProduct } from "@/models/product";
import { Card, CardActions, CardContent, CardMedia, Typography } from "@mui/material";
import { getTranslations } from "next-intl/server";
import AddToCartButton from "./add-to-cart-button";


export default async function ProductCard({ isAddedToCart, product }: { isAddedToCart?: boolean, product: IProduct }) {
    const t = await getTranslations("Store");

    return (
        <Card className="shadow-lg hover:border-gray-200 border-transparent border transition-colors">
            <CardMedia>
                <img src={((product.images[0] as unknown as IImage).relativeUrl.toString() || "") as string} width={1024} height={1024} alt="" />
            </CardMedia>

            <CardContent>
                <Typography className="flex justify-between [&>span]:text-green-800">{t("body.product.name")}: <span>{product.name}</span></Typography>
                <Typography className="flex justify-between [&>span]:text-green-800">{t("body.product.description")}: <span>{product.description}</span></Typography>
                <Typography color={"green"} marginTop={2}>{product.price} EGP</Typography>
            </CardContent>


            <CardActions >
                <AddToCartButton productId={product._id.toString()} />
            </CardActions>
        </Card>
    )
}

