'use client';
import { useTranslations } from "next-intl";

export default function ({ value }: { value?: string }) {
    const t = useTranslations("Signup");

    return (
        <input type="submit" value={value || t("button")} className="cursor-pointer bg-green-400 bg-opacity-75 text-slate-800 hover:bg-opacity-100 hover:text-black transition-all w-[100%] mx-auto rounded px-1 py-2 flex items-center justify-center" />
    )
}