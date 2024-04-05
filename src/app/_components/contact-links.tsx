import { FooterTitle, Footer } from "flowbite-react";
import { FaFacebookSquare, FaTwitterSquare } from "react-icons/fa";
import LinkGroup from "./link-group";
import { getTranslations } from "next-intl/server";

export default async function ContactLinks() {
    const t = await getTranslations("Index");

    return (
        <LinkGroup title={t("footer.contact")} itemType="link" className="flex flex-col w-fit">
            <FooterTitle title={t("footer.contact")} className="font-semibold text-center" />
            <Footer.Link href="www.facebook.com/plasmadome" title="contact on facebook" className="flex flex-row gap-2" >
                <div className="flex items-center gap-1">
                    <FaFacebookSquare />
                    {t("footer.facebook")}
                </div>
            </Footer.Link>
            <Footer.Link href="www.twitter.com/plasmadome" title="contact on twitter" >
                <div className="flex items-center gap-1">
                    <FaTwitterSquare />
                    {t("footer.twitter")}
                </div>

            </Footer.Link>
        </LinkGroup>
    )
}