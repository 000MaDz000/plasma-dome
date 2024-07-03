'use client';

import ProductsCountBox from "./dashboard-products-count-box";
import FeaturedProductsCountBox from "./featured-products-count-box";
import NormalProductsCountBox from "./normal-products-count-box";
import ProductsStatisticsProvider from "./products-statistics-provider";

export default function ProductsCountsBoxes() {
    return (
        <ProductsStatisticsProvider>
            <ProductsCountBox />
            <NormalProductsCountBox />
            <FeaturedProductsCountBox />
        </ProductsStatisticsProvider>
    )
}