import StoreHeader from "@/app/_components/store-header";
import { ReactNode } from "react";

export default function ProductsLayout(props: { children: ReactNode }) {
    return (
        <div className="flex flex-col gap-9 min-h-screen">
            <StoreHeader />
            {props.children}
        </div>
    )
}