'use server';
import session from "../_functions/session";

export default async function getCartData() {
    const sess = await session();
    let data = sess?.data?.cart?.products || [];

    return data;
}


export async function DeleteFromCart(productId: string) {
    const sess = await session();
    sess.data.cart.products = sess.data.cart.products.filter(val => val._id !== productId);
    sess.save();
    return 200;
}

export async function UpdateQuantity(productId: string, quantity: number) {
    const sess = await session();

    let val = sess.data.cart.products.find(v => v._id == productId);

    if (val) {
        val.quantity = quantity;
        sess.save();
        return 200;
    }

    return 404
}

export type ICartProduct = {
    quantity: number;
    images: string[];
    _id: string;
    name: string;
    categories: string[];
    description: string;
    price: number;
    discount?: number
};