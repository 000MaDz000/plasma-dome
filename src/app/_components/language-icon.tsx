'use client';

import { Box, CircularProgress, IconButton, Menu, MenuItem, } from "@mui/material";
import { useLocale, useTranslations } from "next-intl";
import { usePathname, useRouter } from "next/navigation";
import { useRef, useState, useTransition } from "react";
import { FaLanguage } from "react-icons/fa";

export default function LanguageIcon() {
    const locale = useLocale();
    const pathname = usePathname();
    const router = useRouter();
    const t = useTranslations("Locales");
    const [isPending, startTransition] = useTransition();
    const [menu, setMenu] = useState(false);
    const ref = useRef<HTMLElement>(null);

    const changeLanguage = (locale: string) => {
        startTransition(() => {
            router.replace("/" + locale + pathname.slice(3), { locale } as any);
            router.refresh();
        });


        setMenu(false);
    }

    return (
        <Box className="flex items-center justify-center">
            {isPending ? (
                <>
                    <CircularProgress size={"1rem"} />
                </>
            ) : (
                <IconButton onClick={() => setMenu(true)} ref={ref as any}>
                    <FaLanguage />
                </IconButton>
            )
            }

            {ref.current && (
                <Menu open={menu} anchorEl={() => ref.current as any} onClose={() => setMenu(false)} onChange={(e) => console.log(e)}>
                    <MenuItem onClick={() => changeLanguage("ar")} disabled={locale === "ar"}>{t("ar")}</MenuItem>
                    <MenuItem onClick={() => changeLanguage("en")} disabled={locale === "en"}>{t("en")}</MenuItem>
                </Menu>
            )}
        </Box>
    )
}