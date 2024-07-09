import session from "@/app/_functions/session";
import { redirect } from "next/navigation";
import { ReactNode } from "react";

export default async function CreateOrderLayout({ children }: { children: ReactNode }) {
    const sess = await session();
    const isLoggedIn = sess.data.authorized;
    if (!isLoggedIn) redirect("/login");
    if (!sess.data.cart?.products || !sess.data.cart?.products.length) redirect("/user");
    return children;
}