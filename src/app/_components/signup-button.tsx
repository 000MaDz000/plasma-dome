import { useTranslations } from "next-intl";
import HeaderLink from "./header-link";
import MenuLink from "./menu-link";



export default function SignupButton({ isMenu }: { isMenu?: boolean }) {
    const t = useTranslations();
    return (
        isMenu ? <MenuLink href="/signup">{t("signup")}</MenuLink> :
            <HeaderLink href="/signup">{t("signup")}</HeaderLink>
    )
}