import { Footer } from "flowbite-react";
import { getTranslations } from "next-intl/server";
import FooterTitle from "./footer-title";
import LinkGroup from "./link-group";

export default async function TermsLinks() {
    const t = await getTranslations("Links.terms");
    return (
        <LinkGroup >
            <FooterTitle className="" title={t("title")} />
            <Footer.Link href="/terms/payments">{t("payments")}</Footer.Link>
            <Footer.Link href="/terms/purchase">{t("purchase")}</Footer.Link>
            <Footer.Link href="/terms/returns-exchanges">{t("returns-exchanges")}</Footer.Link>
        </LinkGroup>
    )
}