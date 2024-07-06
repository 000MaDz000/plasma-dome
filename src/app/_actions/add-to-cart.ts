'use server';

import { Product } from "../_classes/models";
import session from "../_functions/session";
import FilterProduct from "../_functions/filter-product";

export default async function AddToCart(productId: string) {
    const sess = await session();
    const data = sess.data?.cart?.products || [];

    // if the product is added already to the cart, increment it's quantity
    if (data.length) {
        const exists = data.find(val => val._id == productId);
        if (exists) {
            exists.quantity++;
            sess.save();
            return 200;
        }
    }

    // if not added to cart, add it
    const product = await Product.findById(productId).populate("images");
    if (!product) return 404;

    data.push({
        ...FilterProduct(product as any),
        quantity: 1,
    });

    sess.data.cart = { products: data };
    sess.save();
    return 200;
}