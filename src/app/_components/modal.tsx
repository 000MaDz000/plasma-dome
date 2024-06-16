'use client';
import { Box, IconButton, Modal as MuiModal, Tooltip } from "@mui/material";
import { useTranslations } from "next-intl";
import { BiXCircle } from "react-icons/bi";
export default function Modal({ open, onClose, children }: { open: boolean, onClose: () => void, children: React.ReactNode }) {
    const t = useTranslations("Store.body.alerts");

    return (
        <MuiModal open={open}>
            <div className="flex items-center justify-center w-screen h-screen">
                <Box className="md:w-1/2 w-3/4 bg-white p-4 rounded-md">

                    <Box className="flex justify-end">
                        <Tooltip title={t("close")}>
                            <IconButton color={"error"} onClick={onClose}>
                                <BiXCircle />
                            </IconButton>
                        </Tooltip>
                    </Box>

                    <Box>
                        {children}
                    </Box>
                </Box>
            </div>
        </MuiModal>
    )
}