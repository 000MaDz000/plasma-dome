'use server';

import { randomUUID } from "crypto";
import session from "../_functions/session";

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