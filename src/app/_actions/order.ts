'use server';

import { randomUUID } from "crypto";
import session from "../_functions/session";
import { Order } from "../_classes/models";

export async function setOrderData(data: FormData) {
    const name = data.get("name");
    const mobile = data.get("mobile");
    console.log(name, mobile, data);

    if (!name) return 400;
    if (!mobile || mobile.toString().length < 11) return 400;
    const sess = await session();

    const code = randomUUID().replaceAll("-", "").slice(0, 9);

    sess.data.user = {
        name: name.toString(),
        mobile: mobile.toString(),
        verifyCode: code,
    }

    sess.save();

    /* SMS INTEGRATION NOT ADDED YET */


    return 200;
}


export async function createOrder(verifyCode: string) {
    const sess = await session();
    if (sess.data.user.verifyCode !== verifyCode) {
        return 400;
    }

    // create the order
    // clear the cart
    const CartData = sess.data.cart.products;
    let totalPrice: number = 0;

    for (let product of CartData) totalPrice += product.price * product.quantity;

    const order = new Order({
        "products": CartData,
        "customerName": sess.data.user.name,
        "customerPhone": sess.data.user.mobile,
        "totalPrice": totalPrice,
    });

    const orderData = await order.save();
    sess.data.cart.products = [];
    sess.save();

    return orderData;

}