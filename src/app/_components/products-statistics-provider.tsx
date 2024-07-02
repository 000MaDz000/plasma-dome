import ProductsStatistics from "@/app/_contexts/products-statistics";
import { useEffect, useMemo, useState } from "react";
import { ProductsApi } from "../_classes/api";
export default function ProductsStatisticsProvider({ children }: { children: React.ReactNode }) {
    const [value, setValue] = useState<{ [key: string]: number } | null>(null);
    const api = useMemo(() => new ProductsApi(), []);
    useEffect(() => {
        if (!value) {
            api.fetchStatistics().then(setValue);
        }
    }, []);

    return (
        value &&
        <ProductsStatistics.Provider value={value as any}>
            {children}
        </ProductsStatistics.Provider>
    )
}