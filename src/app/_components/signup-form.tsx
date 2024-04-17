import { getTranslations } from "next-intl/server"
import SignupWaysButtons from "./signup-ways-buttons"
import StandardLoginAction from "../_actions/standard-login"
import ConfirmSignupButton from "./confirm-signup-button"

export default async function SignupForm() {
    const t = await getTranslations("Signup")
    return (
        <div className="flex flex-col items-center gap-10">
            <div className="font-mono text-xl text-stone-700">
                <h1>{t("title")}</h1>
            </div>

            <form className="flex flex-col gap-2 [&>input]:bg-gray-100 [&>input]:p-2 [&>input]:rounded-sm [&>input]:w-full w-full" action={StandardLoginAction}>
                <input type="text" placeholder={t("email-or-mobile")} autoComplete="email-or-mobile" name="email-or-mobile" className=" placeholder:text-sm" />

                {/* <input type="text" placeholder={t("name")} autoComplete="name" name="name" /> */}
                {/* <input type="password" placeholder={t("password")} autoComplete="password" name="password" /> */}
                {/* <input type="password" placeholder={t("confirm_password")} autoComplete="password" name="confirm-password" /> */}
                <div className="mt-4">
                    <ConfirmSignupButton />
                </div>
            </form>

            <SignupWaysButtons />
        </div>

    )
}