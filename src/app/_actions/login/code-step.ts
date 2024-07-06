'use server';

import { SessionData } from "express-session";
import { ValidateType } from "../standard-login";
import NextSession from "@/app/_classes/next-session";
import { getTranslations } from "next-intl/server";

export default async function codeStep(type: ValidateType, data: string, sess: NextSession) {
    const t = await getTranslations("Login.errors");

    if (!data.length) {
        return {
            type,
            errorMessage: t("code not provided"),
            success: false,
            nextStep: null,
        }
    }

    if (data !== sess.data.user.verifyCode) {
        return {
            type,
            errorMessage: t("wrong code"),
            success: false,
            nextStep: null,
        }
    }

    sess.data.user.codeVeryfied = true;
    sess.data.user.verifyCode = undefined;
    sess.save();

    return {
        type,
        success: true,
        nextStep: "password"
    }
}