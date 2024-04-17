import ConfirmCodeForm from "@/app/_components/confirm-code-form";

export default function ({ searchParams }: { searchParams: { id: string } }) {

    return (
        <div className="bg-white shadow p-4 rounded sm:w-1/2 md:w-[43vw]">
            <ConfirmCodeForm id={searchParams.id || ""} />
        </div>
    )
}