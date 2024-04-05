import Link from "next/link";
import { PropsWithChildren } from "react";

export default function MenuLink({ href, children }: PropsWithChildren<{ href: string }>) {
    return (
        <Link href={href} className="p-2 ">{children}</Link>
    )
}