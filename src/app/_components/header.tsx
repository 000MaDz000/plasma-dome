import { useTranslations } from "next-intl";
import Image from "next/image";

export default function Header({ children, className }: { children?: React.ReactNode, className?: string }) {
    const t = useTranslations("Index");
    return (
        // bg-gradient-to-l from-slate-700 via-sky-950 to-gray-800
        <header className={"flex justify-between items-center py-3 px-4 sm:px-14 bg-transparent sticky top-0 left-0 bg-gradient-to-r from-gray-700 to-gray-700 via-gray-600" + (className || "")}>
            <div className="flex gap-3 items-center">
                <Image src="/logo.png" alt="" width={80} height={80} className="rounded-full bg-blend-darken" />
                <h1>{t("title")}</h1>
            </div>

            <div className="">
                {children}
            </div>
        </header>
    )
}