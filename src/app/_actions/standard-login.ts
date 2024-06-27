'use server';
import { getTranslations } from "next-intl/server";
import generateCode from "../_functions/generate-code";
import { redirect, RedirectType } from "next/navigation";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import getLocale from "../_functions/get-locale";
import session from "../_functions/session";
import { User } from "../_classes/models";
import { randomUUID } from "crypto";
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
    console.log(sess.data.user);


    switch (type) {
        case "mobile":
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
                sess.save();

                console.log(sess.data.user.verifyCode);
                return {
                    type,
                    success: true,
                    nextStep: "name"
                }
            }


            break;

        case "code":
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

            break;

        case "name":
            sess.data.user.name = data || sess.data.user.mobile;
            sess.save();
            return {
                type,
                success: true,
                nextStep: "code",
            }
            break;

        case "password":
            if (!sess.data.user.codeVeryfied) {
                return {
                    type,
                    success: false,
                    errorMessage: t("code not provided"),
                    nextStep: sess.data.user.mobile ? "code" : "mobile",
                }
            }


            const Exists = await User.findOne({ mobile: sess.data.user.mobile });
            if (Exists) {

                if (Exists.password === data) {
                    sess.data.authorized = true;

                    if (Exists.permissions.find((v => v.name === "admin"))) {
                        sess.data.user.role = "admin";
                        await sess.save();

                        return {
                            type,
                            success: true,
                            nextStep: "dashboard",
                        }
                    }

                    await sess.save();
                    return {
                        type,
                        success: true,
                        nextStep: null,
                    }
                }
                else {
                    return {
                        type,
                        success: false,
                        errorMessage: t("wrong password"),
                        nextStep: null,
                    }
                }
            }
            else {

                if (data.length < 8) {
                    return {
                        type,
                        success: false,
                        errorMessage: t("password length"),
                        nextStep: null,
                    }
                }

                sess.data.user.password = data;
                sess.save();

                return {
                    type,
                    success: true,
                    nextStep: sess.data.user.name ? "confirm password" : null,
                }
            }

            break;

        case "confirm password":
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

            break;

    }

    return {
        type,
        success: false,
        errorMessage: t("unknown type"),
        nextStep: null
    }
}