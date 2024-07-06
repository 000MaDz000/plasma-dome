'use server';
import NextSession from "@/app/_classes/next-session";
import { ValidateType } from "../standard-login";

export default async function nameStep(type: ValidateType, data: string, sess: NextSession) {
    sess.data.user.name = data || sess.data.user.mobile;
    sess.save();
    return {
        type,
        success: true,
        nextStep: "code",
    }
}