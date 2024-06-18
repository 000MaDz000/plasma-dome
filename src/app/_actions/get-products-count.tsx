'use server';

import { Product } from "../_classes/models";

export default async function () {
    const count = await Product.estimatedDocumentCount();
    return count;
}