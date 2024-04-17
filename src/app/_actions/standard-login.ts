'use server';
import { getTranslations } from "next-intl/server";
import generateCode from "../_functions/generate-code";
import { redirect, RedirectType } from "next/navigation";
import { Ghost } from "../_classes/models";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import getLocale from "../_functions/get-locale";
const emailRegex = /\w+\.\w+/ig;

export default async function StandardLoginAction(data: FormData) {
    const locale = getLocale();
    const t = await getTranslations("responses");

    // get the data
    const userInput = data.get("email-or-mobile");
    const emailOrMobile = userInput ? userInput.toString() : "";

    // only allow email
    if (!(emailOrMobile.match(emailRegex))) {
        const res = t("unsupported-format")
        return res;
    }

    // generate the verification code
    const ghostData = await Ghost.findOneAndUpdate({
        "communicationData": emailOrMobile,
        communicationDataType: "email",
    }, {
        $set: {
            code: generateCode()
        }
    }, { "upsert": true, returnDocument: "after" });

    // redirect to the verify page
    redirect(`/${locale}/signup/confirm?id=${ghostData._id.toString()}`, RedirectType.replace);
}

export async function verifyCode(data: FormData) {
    const code = data.get("code")?.toString();
    const id = data.get("id")?.toString();

    if (!id || id.length !== 24) redirect(`/${getLocale()}/login`);
    if (!code || code.length !== 8) return 400;

    const ghost = await Ghost.findById(id);
    if (ghost?.code !== code) {
        return 400;
    }

    redirect(`/${getLocale()}/home`)
}