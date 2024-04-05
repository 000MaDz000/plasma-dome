import { getTranslations } from "next-intl/server"
import SurviceCard from "./survice-card"

export default async function SurviceCards() {
    const t = await getTranslations("branches");
    return (
        <>
            <SurviceCard content={t("paints.content")} title={t("paints.title")} icon="/paints-1.png" />
            <SurviceCard content={t("electronics.content")} title={t("electronics.title")} icon="/cart-bg.jpeg" />
            {/* <SurviceCard content="pick your home color" title="Paints" icon="/k.jpeg" /> */}
        </>
    )
}