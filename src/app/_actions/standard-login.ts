'use server';
import { getTranslations } from "next-intl/server";
import session from "../_functions/session";
import mobileStep from "./login/mobile-step";
import codeStep from "./login/code-step";
import nameStep from "./login/name-step";
import passwordStep from "./login/password-step";
import confirmPasswordStep from "./login/confirm-password-step";
const emailRegex = /\w+\.\w+/ig;

export type ValidateType = "mobile" | "name" | "password" | "confirm password" | "code";
export type ValidateReturns = {
    type: ValidateType;
    errorMessage?: string;
    success: boolean;
    nextStep: null | string;
}

export async function ValidateLoginStep(type: ValidateType, data: string): Promise<ValidateReturns> {
    const sess = await session();
    const t = await getTranslations("Login.errors");


    switch (type) {
        case "mobile":
            return await mobileStep(type, data, sess);
            break;

        case "code":
            return await codeStep(type, data, sess);
            break;

        case "name":
            return await nameStep(type, data, sess);
            break;

        case "password":
            return await passwordStep(type, data, sess);
            break;

        case "confirm password":
            return await confirmPasswordStep(type, data, sess);
            break;

    }

    return {
        type,
        success: false,
        errorMessage: t("unknown type"),
        nextStep: null
    }
}