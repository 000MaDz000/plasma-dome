'use server';

import { randomUUID } from "crypto";
import NextSession from "../../_classes/next-session";
import { getTranslations } from "next-intl/server";
import { User } from "@/app/_classes/models";
import { ValidateReturns, ValidateType } from "../standard-login";
import SendSMS from "./send-sms";

export default async function mobileStep(type: ValidateType, data: string, sess: NextSession): Promise<ValidateReturns> {
    const t = await getTranslations("Login.errors");

    if (!data.length) {
        return {
            type,
            errorMessage: t("mobile number not provided"),
            success: false,
            nextStep: null,
        }
    }


    const exists = await User.findOne({ "mobile": data });

    if (exists) {
        sess.data.user.codeVeryfied = true;
        sess.data.user.mobile = data;
        await sess.save();

        return {
            type,
            success: true,
            nextStep: "password",
        }
    }

    else {

        sess.data.user.mobile = data;
        sess.data.user.verifyCode = randomUUID().replaceAll("-", "").slice(0, 9);
        await SendSMS(sess.data.user.mobile, sess.data.user.verifyCode);
        sess.save();

        console.log(sess.data.user.verifyCode);
        return {
            type,
            success: true,
            nextStep: "name"
        }
    }
}