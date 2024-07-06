'use server';

import { Settings } from "../_classes/models";
import session from "../_functions/session";

export default async function setSetting(name: string, value: string[]) {
    const sess = await session();
    if (!sess.data.authorized || sess.data.user.role !== "admin") return 400;

    await Settings.updateOne({ name }, { $set: { value } }, { upsert: true });
    return 200;
}