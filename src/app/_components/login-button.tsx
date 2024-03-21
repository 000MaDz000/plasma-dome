import { useTranslations } from "next-intl";
import HeaderLink from "./header-link";

export default function LoginButton() {
    const t = useTranslations();
    return (
        <HeaderLink href="/login">{t("login")}</HeaderLink>
    )
}