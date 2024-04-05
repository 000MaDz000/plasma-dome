import Link from "next/link";

export default function HeaderLink({ children, href }: { children?: React.ReactNode, href: string }) {
    return (
        <Link href={href} className={`p-2 text-white border-purple-700 border-2 bg-purple-800 bg-opacity-30 hover:bg-opacity-100 transition-all rounded-md`}>{children}</Link>
    )
}