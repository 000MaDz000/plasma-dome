import { Product } from "@/app/_classes/models";
import { IImage } from "@/models/image";
import { Button, Container, Typography } from "@mui/material";
import { getTranslations } from "next-intl/server";
import ProductsPage from "../page";
import AddToCartButton from "@/app/_components/add-to-cart-button";

export default async function ProductPage({ params }: { params: { locale: string, productId: string } }) {
    const { productId } = params;
    const product = await Product.findById(productId).populate("images");
    const t = await getTranslations("Store.body.product");
    return (
        <div className="grow flex flex-col gap-8">
            <Container>
                <div className="grow flex flex-col lg:flex-row gap-4 bg-gray-200 p-3">
                    <div className="flex-1 flex justify-between mx-auto w-full bg-slate-50">
                        <div className="flex items-center justify-center w-full min-w-44">
                            {/* {
                            product?.images.map(img => (
                                <img src={(img as unknown as IImage).relativeUrl} key={(img as any)._id.toString()} className="m-2 p-2 w-full max-w-96" />
                            ))
                        } */}
                            <img src={(product?.images[0] as any).relativeUrl} alt="" className="max-w-full" />
                        </div>


                        <div className="lg:hidden m-9">
                            <Typography mx={2}>{product?.name}</Typography>
                        </div>


                    </div>

                    <div className="flex-grow-[2] p-4 flex flex-col justify-between">

                        <div className="flex flex-col">

                            <div>
                                <Typography variant="h6">{t("egp", { price: product?.price })}</Typography>
                            </div>

                            <div className="hidden lg:block">
                                <Typography my={2}>{product?.name}</Typography>
                            </div>

                            <div>
                                <Typography variant="h6">{t("description")}</Typography>
                                <Typography>{product?.description}</Typography>
                            </div>
                        </div>


                        <div className="flex justify-center mt-4">
                            <AddToCartButton productId={productId} contained fullWidth />
                        </div>
                    </div>
                </div>

                <div className="grow"></div>
            </Container>

            <ProductsPage searchParams={{ search: "" }} />
        </div>
    )
}