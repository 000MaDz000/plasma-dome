import { Product } from "@/app/_classes/models"
import ProductCard from "@/app/_components/product-card";
import { Container, Typography } from "@mui/material";
import { getTranslations } from "next-intl/server";
import StoreFooter from "@/app/_components/store-footer";
import LoginAlert from "@/app/_components/login-alert";
import session from "@/app/_functions/session";

export default async function ProductsPage({ searchParams }: { searchParams: { search: string } }) {
    const t = await getTranslations("Store.search");
    const sess = await session();
    const products = await Product.find({
        categories: {
            $in: new RegExp(searchParams.search)
        }
    }).populate("images");


    return (
        <>
            {
                products.length ? (

                    <div className="grid md:grid-cols-3 xl:grid-cols-5 2xl:grid-cols-6 mx-7 gap-7">
                        {products.map(p => <ProductCard product={p.toObject()} key={p._id.toString()} />)}
                    </div>
                ) : (
                    <div className="flex flex-col items-center grow">
                        <Typography variant="h5">{t("no search data", { searchString: searchParams.search })}</Typography>
                        <Typography variant="h6">{t("no data help")}</Typography>
                    </div>
                )
            }

            <div className="w-screen">

                <Container >
                    {!sess.data.authorized && (
                        <LoginAlert />
                    )}
                </Container>
            </div>

            <StoreFooter />
        </>
    )
}