'use client';
import { IconButton, Tooltip } from "@mui/material"
import { useTranslations } from "next-intl"
import Link from "next/link"
import { FaUser } from "react-icons/fa"

export default function () {
    const t = useTranslations("Store.header");

    return (
        <Tooltip title={t("you")}>
            <Link href="/user">
                <IconButton>
                    <FaUser />
                </IconButton>
            </Link>
        </Tooltip>

    )
}