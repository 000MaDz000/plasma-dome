import { useTranslations } from "next-intl";
import HeaderLink from "./header-link";



export default function SignupButton() {
    const t = useTranslations();
    return (
        <HeaderLink href="/signup">{t("signup")}</HeaderLink>
    )
}