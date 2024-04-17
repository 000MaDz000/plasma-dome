import { getTranslations } from "next-intl/server"

export default async function () {
    const t = await getTranslations("Signup");

    return (
        <input type="submit" value={t("button")} className="cursor-pointer bg-green-400 bg-opacity-75 text-slate-800 hover:bg-opacity-100 hover:text-black transition-all w-[100%] mx-auto rounded px-1 py-2 flex items-center justify-center" />
    )
}