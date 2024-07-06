'use server';

import NextSession from "@/app/_classes/next-session";
import { ValidateType } from "../standard-login";
import { User } from "@/app/_classes/models";
import { getTranslations } from "next-intl/server";

export default async function confirmPasswordStep(type: ValidateType, data: string, sess: NextSession) {
    const t = await getTranslations("Login.errors");

    if (await User.findOne({ "mobile": sess.data.user.mobile })) {
        return {
            type,
            success: false,
            errorMessage: t("unknown type"),
            nextStep: null
        }
    }

    if (sess.data.user.password !== data) {
        return {
            type,
            success: false,
            errorMessage: t("wrong password"),
            nextStep: null,
        }
    }

    const user = new User({
        name: sess.data.user.name,
        mobile: sess.data.user.mobile,
        password: sess.data.user.password,
    });

    await user.save();
    sess.data.authorized = true;
    sess.save();

    return {
        type,
        success: true, nextStep: null,
    }
}