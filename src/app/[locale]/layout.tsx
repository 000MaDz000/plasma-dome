import { PropsWithChildren } from "react";

export default function Layout({ children, params }: PropsWithChildren & { params: { locale: string } }) {
    return (
        <div dir={params.locale === "ar" ? "rtl" : "ltr"}>
            {children}
        </div>
    )
}