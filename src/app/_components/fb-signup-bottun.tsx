import { FaFacebook } from "react-icons/fa";
import CustomSignButton from "./custom-sign-button";
import { getTranslations } from "next-intl/server";

export default async function FbSignupButton() {
    const t = await getTranslations("Signup");
    return (
        <CustomSignButton title={t("facebook-button")} icon={<FaFacebook />} />
    )
}