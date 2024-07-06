'use client';

import { Box, Button, Paper, Typography } from "@mui/material";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function LoginAlert() {
    const t = useTranslations();
    const router = useRouter();

    return (
        <Paper className="p-3 md:w-1/2 mx-auto">
            <Box className="flex flex-col items-center justify-between gap-4">
                <Box className="flex flex-col">
                    <Typography>
                        {t("Login.alerts.see your recommendations")}
                    </Typography>

                    <Typography>
                        {t("Login.alerts.dont have account")} <Link href={"/login"} className="text-blue-700 hover:underline">{t("Login.alerts.create account")}</Link>
                    </Typography>

                </Box>

                <Button variant="contained" fullWidth onClick={() => router.push("/login")}>
                    {t("login")}
                </Button>
            </Box>
        </Paper>
    )
}