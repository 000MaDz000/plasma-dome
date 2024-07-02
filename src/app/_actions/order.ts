'use server';

import { randomUUID } from "crypto";
import session from "../_functions/session";
import { Order, Statistics } from "../_classes/models";
import isAdmin from "../_functions/is-admin";
import { redirect } from "next/navigation";
import { IOrder } from "@/models/order";
import { IStatisticsName } from "@/models/statistics";

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
        password: sess.data.user.password,
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

    const statisticName: IStatisticsName = "liveOrders";

    await Statistics.updateOne(
        {
            name: statisticName,
            "date.year": orderData.orderDate.getUTCFullYear(),
            "date.month": orderData.orderDate.getUTCMonth() + 1,
            "date.day": orderData.orderDate.getUTCDate(),
        },
        {
            $inc: {
                count: 1,
            }
        },
        { upsert: true }
    );


    return orderData;

}

export default async function EndOrder(id: string) {
    if (!id || id.length !== 24) return 400;
    const order = await Order.findById(id);

    if (!order || order.ended) return 400;

    order.ended = true;
    await order.save();

    const endName: IStatisticsName = "endedOrders";
    const salesName: IStatisticsName = "sales"; // the sales count
    const salesValue: IStatisticsName = "salesValue"; // the sales value
    const totalSalesValue: IStatisticsName = "totalSalesValue"; // the total sales count

    // build the date query data
    const ordersDateQueryData = {
        "date.year": order.orderDate.getUTCFullYear(),
        "date.month": order.orderDate.getUTCMonth() + 1,
        "date.day": order.orderDate.getUTCDate(),
    }

    // increment the ended orders
    await Statistics.updateOne({
        name: endName,
        ...ordersDateQueryData
    }, { "$inc": { count: 1 } }, { upsert: true });



    // build the date query data
    const date = new Date();
    const salesDateQueryData = {
        "date.year": date.getUTCFullYear(),
        "date.month": date.getUTCMonth() + 1,
        "date.day": date.getUTCDate(),
    }


    // increment the sales count
    await Statistics.updateOne(
        {
            name: salesName,
            ...salesDateQueryData
        },
        { $inc: { count: 1 } },
        { upsert: true }
    );


    // increment sales count and total sales count
    await Statistics.updateOne(
        {
            name: salesValue,
            ...salesDateQueryData
        },
        {
            $inc: {
                count: order.totalPrice,
            }
        },
        { upsert: true }
    );

    // total sales count is a counter started from the app start to unknown time
    // it's counts all sales values on the website
    // so, we will not add the date query
    await Statistics.updateOne(
        {
            name: totalSalesValue,
        },
        {
            $inc: {
                count: order.totalPrice,
            }
        },
        { upsert: true }
    );


    return 200;
}

export async function CancelOrder(id: string) {
    if (!id || id.length !== 24) return 400;
    const order = await Order.findById(id);

    if (!order) return 400;

    order.cancled = {
        status: true,
        reason: "cancled by admin",
    };

    await order.save();

    const endName: IStatisticsName = "endedOrders";

    // increment the ended orders
    await Statistics.updateOne({
        name: endName,
        "date.year": order.orderDate.getUTCFullYear(),
        "date.month": order.orderDate.getUTCMonth() + 1,
        "date.day": order.orderDate.getUTCDate(),
    }, { "$inc": { count: 1 } }, { upsert: true });

    return 200;
}