'use client';

import { useEffect } from "react";

export default function CreateAdForm() {
    useEffect(() => {
        fetch("/api/dashboard/ads/668691d632812a5b8c4a5353", { method: "delete" }).then(console.log);
    }, []);
    return (
        <form method="post" action={"/api/dashboard/ads/"} encType="multipart/form-data">
            <input type="text" name="barName" placeholder="barname" />
            <input type="text" name="link" placeholder="link" />
            <input type="file" accept="image/png, image/jpeg, image/jpg" name="images" />
            <input type="submit" value={"val"} />
        </form>
    )
}