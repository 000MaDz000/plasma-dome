'use client';
import Image from "next/image";

export default function PlasmaDomeBackground() {
    return (
        <Image src="/background.jpeg" alt="" className="absolute object-center object-fill -z-10 top-0 left-0 w-full h-full" width={1024} height={1024} />
    )
}