import { useTranslations } from "next-intl";
import HeaderLink from "./header-link";
import MenuLink from "./menu-link";

export default function LoginButton({ isMenu }: { isMenu?: boolean }) {
    const t = useTranslations();
    return (
        isMenu ? <MenuLink href="/login">{t("login")}</MenuLink> :
            <HeaderLink href="/login">{t("login")}</HeaderLink>
    )
}