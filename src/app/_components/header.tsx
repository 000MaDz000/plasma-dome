import Image from "next/image";

export default function Header({ children }: { children?: React.ReactNode }) {
    return (
        // bg-gradient-to-l from-slate-700 via-sky-950 to-gray-800
        <header className="flex justify-between items-center py-3 px-14 bg-transparent">
            <Image src="/logo.png" alt="" width={80} height={80} className="rounded-full bg-blend-darken" />

            <div className="">
                {children}
            </div>
        </header>
    )
}