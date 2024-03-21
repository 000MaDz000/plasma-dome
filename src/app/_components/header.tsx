import Image from "next/image";

export default function Header({ children }: { children?: React.ReactNode }) {
    return (
        <header className="flex justify-between items-center py-3 px-14 bg-gradient-to-l from-slate-700 via-sky-950 to-gray-800">
            <Image src="/logo.png" alt="" width={80} height={80} className="bg-gray-800 rounded-full" />

            <div className="">
                {children}
            </div>
        </header>
    )
}