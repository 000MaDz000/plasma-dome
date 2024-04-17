export default function CustomSignButton({ title, icon }: { title: string, icon: React.ReactNode }) {
    return (
        <div className="w-full flex gap-3 items-center justify-center bg-gradient-to-l from-gray-100 to-slate-100 via-white p-4 rounded-sm cursor-pointer hover:to-slate-200 hover:from-gray-200 hover:via-transparent">
            <div className="text-slate-600">
                {icon}
            </div>
            <h1 className="text-slate-800 text-sm">{title}</h1>
        </div>
    )
}