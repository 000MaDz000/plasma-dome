import { createContext } from "react";

const ProductsStatistics = createContext({ normalProducts: 0, featuredProducts: 0, totalProducts: 0 });

export default ProductsStatistics;