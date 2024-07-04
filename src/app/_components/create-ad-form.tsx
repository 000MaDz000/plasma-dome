'use client';
import { Button, Input } from "@mui/material";
import { useTranslations } from "next-intl";
import { useEffect, useRef, useState } from "react";

export default function CreateAdForm() {
    const t = useTranslations("Dashboard.ads");
    const uploadRef = useRef<HTMLInputElement>(null);
    const [uploaded, setUploaded] = useState<string[]>([]);

    const onUploadFile = async () => {
        if (!uploadRef.current) return;
        const files = uploadRef.current.files;
        if (!files) return;

        const uploadedURLs: string[] = [];

        for (let file of (files as unknown as File[])) {
            const buffer = await file.arrayBuffer();
            const blob = new Blob([buffer]);
            const url = URL.createObjectURL(blob);
            uploadedURLs.push(url);
        }

        setUploaded([...uploaded, ...uploadedURLs]);
    }

    useEffect(() => {
        return () => {
            for (let url of uploaded) {
                URL.revokeObjectURL(url);
            }
        }
    }, []);

    return (
        <>
            {uploaded.map(val => (
                <img src={val} alt="" className="w-full max-w-60" />
            ))}
            <form method="post" action={"/api/dashboard/ads/"} encType="multipart/form-data" className="flex flex-col gap-7">
                <Input type="text" name="barName" placeholder="barname" />
                <Input type="text" name="link" placeholder="link" />

                <Button fullWidth onClick={() => uploadRef.current?.click()}>
                    {t("upload images")}
                </Button>

                <input id="upload-ad-images" className="hidden" type="file" accept="image/jpg, image/jpeg, image/png" name="images" ref={uploadRef} onChange={onUploadFile} />

                <Button type="submit" variant="outlined" fullWidth>
                    {t("submit create")}
                </Button>
            </form>
        </>
    )
}