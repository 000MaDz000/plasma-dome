'use client';
import { Box, Button, FormControl, Input, InputLabel, MenuItem, Select } from "@mui/material";
import { useTranslations } from "next-intl";
import { ChangeEvent, useRef, useState } from "react";
import { FaUpload } from "react-icons/fa6";

export default function CreateProductForm() {
    const t = useTranslations("Dashboard.products");
    const fileRef = useRef<HTMLInputElement>(null);
    const [uploaded, setUploaded] = useState<string>("");
    const [showTypeValue, setShowTypeValue] = useState("n");

    const onUploadImg = (e: ChangeEvent) => {
        if (uploaded) {
            URL.revokeObjectURL(uploaded);
        }


        const input = fileRef.current as HTMLInputElement;
        if (!input.files) return;

        const file = input.files[0];

        file.arrayBuffer().then((data) => {
            const blob = new Blob([data]);
            const url = URL.createObjectURL(blob);
            setUploaded(url);
        });

    }

    return (
        <form method="post" encType="multipart/form-data" action="/api/products" className="grid md:grid-cols-2 gap-3">
            <Input name="name" placeholder={t("name")} className="border p-3" />
            <Input name="description" placeholder={t("description")} className="border p-3" />
            <Input name="price" placeholder={t("price")} className="border p-3" />
            <Input name="categories" placeholder={t("categories")} className="border p-3" />
            <input id="create-product-file-upload" type="file" name="images" placeholder={t("images")} className="hidden" ref={fileRef} onChange={onUploadImg} />

            <FormControl fullWidth>
                <InputLabel id="create-product-showtype-label">{t("show type")}</InputLabel>
                <Select fullWidth label={t("show type")} labelId="create-product-showtype-label" value={showTypeValue} onChange={(e) => { setShowTypeValue(e.target.value) }} name="showType">
                    <MenuItem value={"n"}>{t("normal")}</MenuItem>
                    <MenuItem value={"f"}>{t("featured")}</MenuItem>
                </Select>
            </FormControl>

            <FormControl fullWidth>
                <InputLabel id="create-product-shotype-level">{t("show type level")}</InputLabel>
                <Input defaultValue={"1"} name="showTypeLevel" />
            </FormControl>

            {
                uploaded && (
                    <Box className="flex justify-center col-span-2 [&>img]:max-w-40">
                        <img src={uploaded} />
                    </Box>
                )
            }
            <Box className="flex flex-col w-full col-span-2 row-span-2 gap-3">
                <label htmlFor="create-product-file-upload">
                    <Button fullWidth className="h-full" startIcon={<FaUpload />} onClick={() => fileRef.current?.click()}>
                        {t("upload image")}
                    </Button>
                </label>

                <Input type={"submit"} placeholder={t("confirm edit")} className="border p-3 hidden" />
            </Box>
        </form>

    )
}