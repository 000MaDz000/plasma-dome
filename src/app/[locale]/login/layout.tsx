import Header from "@/app/_components/header";
import { Paper } from "@mui/material";
import { Metadata } from "next";
import { getTranslations } from "next-intl/server";

export default function LoginLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="flex flex-col h-screen">
            <Paper>
                <Header className="bg-none" />
            </Paper>

            <div className="h-full flex items-center justify-center">
                {children}
            </div>
        </div>
    )
}


export async function generateMetadata(): Promise<Metadata> {
    const t = await getTranslations("Login");

    return {
        title: t("page title"),
        keywords: "plasmadome,login,member",
    }
}