import { getTranslations } from "next-intl/server"

type Props = {
    params: { id: string }
    searchParams: { [key: string]: string | string[] | undefined }
}


export default function SignupLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="flex flex-col h-screen items-center justify-center bg-gradient-to-tr from-gray-50 to-gray-100 via-white">
            {children}
        </div>
    )
}

export async function generateMetadata({ params, searchParams }: Props) {
    const t = await getTranslations("Signup");
    return {
        title: t("page-title"),
        description: t("description")
    }
}
// generate metadata using app router