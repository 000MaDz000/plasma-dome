'use server';

import NextSession from "@/app/_classes/next-session";
import { ValidateType } from "../standard-login";
import { User } from "@/app/_classes/models";
import { getTranslations } from "next-intl/server";
import hasDashboardPermission from "../has-dashboard-permission";

export default async function passwordStep(type: ValidateType, data: string, sess: NextSession) {
    const t = await getTranslations("Login.errors");

    if (!sess.data.user.codeVeryfied) {
        return {
            type,
            success: false,
            errorMessage: t("code not provided"),
            nextStep: sess.data.user.mobile ? "code" : "mobile",
        }
    }


    const Exists = await User.findOne({ mobile: sess.data.user.mobile });

    // if the user account not found
    if (!Exists) {
        // check if the password length are invalid
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


    if (Exists.password === data) {
        sess.data.authorized = true;

        const canJoinDashboard = await hasDashboardPermission(Exists);

        if (canJoinDashboard) {
            sess.data.user.role = canJoinDashboard as any;
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