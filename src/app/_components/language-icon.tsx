'use client';

import { Box, Button, IconButton, Input, ListItemIcon, Menu, MenuItem, Select } from "@mui/material";
import { useLocale, useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";
import { FaArrowDown, FaLanguage } from "react-icons/fa";

export default function LanguageIcon() {
    const locale = useLocale();
    const router = useRouter();
    const t = useTranslations("Locales");

    const [menu, setMenu] = useState(false);
    const ref = useRef<any>(null);

    const changeLanguage = (locale: string) => {
        const currentPathWithoutLocale = location.pathname.slice(3);
        router.replace("/" + locale + currentPathWithoutLocale);
    }

    return (
        <Box className="flex items-center justify-center">

            <IconButton onClick={() => setMenu(true)} ref={ref}>
                <FaLanguage />
            </IconButton>

            <Menu open={menu} anchorEl={() => ref.current} onClose={() => setMenu(false)} onChange={(e) => console.log(e)}>
                <MenuItem onClick={() => changeLanguage("ar")} disabled={locale === "ar"}>{t("ar")}</MenuItem>
                <MenuItem onClick={() => changeLanguage("en")} disabled={locale === "en"}>{t("en")}</MenuItem>
            </Menu>
        </Box>
    )
}