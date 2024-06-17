'use client';

import { useContext } from "react";
import OpenCloseContext from "../_contexts/openclose";
import { Box, Drawer, Paper } from "@mui/material";
import DashboardSidebarContent from "./dashboard-sidebar-content";

export default function DashboardSidebar() {
    const { open, setOpen } = useContext(OpenCloseContext);


    return (
        <div className="h-full">
            <Drawer open={open} onClose={() => setOpen(false)} className="md:hidden">
                <DashboardSidebarContent />
            </Drawer>

            <Box className="md:flex justify-center hidden py-4 min-w-32 h-full shadow-md border">
                <Box className="sticky top-0 h-fit">
                    <DashboardSidebarContent />
                </Box>
            </Box>
        </div>
    )
}