import { Box, Container, Typography } from "@mui/material";
import ProductCard from "./product-card";
import { Product, Advertisment, Settings } from "../_classes/models";
import ProductsScrollableRow from "./products-scrollable-row";
import Banner from "./banner";
import { ISettingName } from "@/models/settings";
import { ICartProduct } from "../_actions/get-cart-data";
import { getTranslations } from "next-intl/server";
import { IImage } from "@/models/image";

export default async function StoreBody() {
    const recommendationsSettingName: ISettingName = "recommendations";
    const banners = await Advertisment.find({ barName: "top", active: true }).populate("images");
    const recommendations = await Settings.findOne({ name: recommendationsSettingName });
    const data: { [key: string]: ICartProduct[] } = {};
    const t = await getTranslations("Store.body");

    if (recommendations) {
        let fetched: string[] = [];
        for await (const category of recommendations.value) {
            const products = await Product.find({
                categories: {
                    $in: category,
                    $nin: fetched,
                }
            }).limit(21).populate("images");
            fetched.push(category);

            data[category] = products.map(v => v.toObject() as any);
        }
    }

    const cards: ICartProduct[] = [];
    const rows: ICartProduct[][] = [];

    for (let category in data) {
        if (data[category].length >= 13) {
            rows.push(data[category]);
        }
        else {
            cards.push(...data[category]);
        }
    }

    if (!cards.length && !rows.length) {
        const data = await Product.find({}).limit(50).populate("images");
        cards.push(...data.map(val => val.toObject()) as any);
    }

    return (
        <div className="grow h-full flex flex-col">
            <Container maxWidth="xl" className="mt-5">
                <div className="flex flex-col gap-7">
                    <div>
                        {/* top bar */}
                        {banners.map(banner => (
                            <Banner bannerData={{ ...banner.toObject(), images: banner.images.map(img => (img as unknown as IImage).relativeUrl) }} key={banner.barName} />
                        ))}
                    </div>

                    {rows.map(row => (
                        <ProductsScrollableRow products={row} title={""} key={row[0]._id} />
                    ))}

                    <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 grid-cols-1">
                        <>
                            {cards.map(product => (
                                <ProductCard product={product as any} key={product._id.toString()} />
                            ))}
                        </>
                    </div>
                </div>


            </Container>


            {(!rows.length && !cards.length) && (
                <Box className="flex flex-col grow items-center justify-center">
                    <Typography variant="h5">
                        {t("no data")}
                    </Typography>

                    <Typography variant="h6">
                        {t("no data help")}
                    </Typography>
                </Box>
            )}
        </div>
    )
}

// image: 666e18f9984dde9af75e981b
// product: 65fafa7e5c4a466ced23db57