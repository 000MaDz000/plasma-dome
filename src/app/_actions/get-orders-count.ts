'use server';

import { Order } from "../_classes/models";

export async function getOrdersCounts() {
    const pending = await Order.find({ ended: false }).countDocuments();
    const all = await Order.estimatedDocumentCount();
    const ended = all - pending;
    return {
        all, pending, ended
    }
}