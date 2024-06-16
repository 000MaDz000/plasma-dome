'use client';

import { IconButton, Drawer, Box } from "@mui/material";
import { BiMenu } from "react-icons/bi";
import StoreHeaderComponents from "./store-header.components";
import { useState } from "react";

export default function StoreMenuDrawer() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <Box>
            <IconButton size="large" onClick={() => setIsOpen(true)}>
                <BiMenu></BiMenu>
            </IconButton>


            <Drawer open={isOpen} onClose={() => setIsOpen(false)}>
                <div className="flex flex-col-reverse gap-7 items-center mt-16 mx-6">
                    <StoreHeaderComponents />
                </div>
            </Drawer>

        </Box>
    )
}