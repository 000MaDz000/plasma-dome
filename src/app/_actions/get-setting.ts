'use server';

import { ISetting, ISettingName } from "@/models/settings";
import session from "../_functions/session";
import { Settings } from "../_classes/models";

export default async function getSetting(name: ISettingName): Promise<ISetting> {
    const sess = await session();
    if (!sess.data.authorized || sess.data.user.role !== "admin") return { name, value: [] };

    const data = await Settings.findOne({ name });

    return { name, value: data?.value || [] } || { name, value: [] };
}