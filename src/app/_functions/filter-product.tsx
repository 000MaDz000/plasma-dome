import { IImage } from "@/models/image";
import { IProduct } from "@/models/product";

// returns -- remove tax, remove profitRatio, remove everything about images but url
export default function FilterProduct(product: Omit<IProduct, "images"> & { images: IImage[] }): Omit<Omit<Omit<IProduct, "images"> & { images: string[] }, "profitRatio">, "tax"> {
    return {
        "_id": product._id.toString(),
        "categories": product.categories,
        "description": product.description,
        "images": product.images.map(val => val.relativeUrl),
        "name": product.name,
        "price": product.price,
        showTypes: product.showTypes || []
    }
}

