import { getTranslations } from "next-intl/server";
import { GrGoogle } from "react-icons/gr";
import CustomSignButton from "./custom-sign-button";

export default async function GoogleSignupButton() {
    const t = await getTranslations("Signup");
    return (
        <CustomSignButton icon={<GrGoogle />} title={t("google-button")} />
    )
}