'use client';
import DashboardSidebar from "@/app/_components/dashboard-side-bar";
import Header from "@/app/_components/header";
import OpenCloseContext from "@/app/_contexts/openclose";
import { Box, IconButton, Paper, Tooltip } from "@mui/material";
import { useTranslations } from "next-intl";
import React, { useEffect, useState } from "react";
import { FaBell } from "react-icons/fa";
import { FaPerson } from "react-icons/fa6";
import { MdMenu } from "react-icons/md";


export default function DashboardPage({ children }: { children: React.ReactNode }) {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const t = useTranslations("Dashboard.header");

    return (
        <div className="flex flex-col min-h-screen">
            {/* the header and paper container */}
            <Paper>

                <Header className="bg-none">
                    <Box className="flex gap-3">

                        <Tooltip title={t("notifications")}>
                            <IconButton>
                                <FaBell />
                            </IconButton>
                        </Tooltip>

                        <Tooltip title={t("your account")}>
                            <IconButton>
                                <FaPerson />
                            </IconButton>
                        </Tooltip>

                        <div className="md:hidden" >

                            <IconButton size="large" onClick={() => setSidebarOpen(!sidebarOpen)}>
                                <MdMenu />
                            </IconButton>
                        </div>

                    </Box>
                </Header>
            </Paper>

            {/* the content */}
            <Box className="grow flex bg-gray-50">
                {/* dashboard sidebar */}
                <Box className="">
                    <OpenCloseContext.Provider value={{ open: sidebarOpen, setOpen: setSidebarOpen }}>
                        <DashboardSidebar />
                    </OpenCloseContext.Provider>
                </Box>

                {/* dashboard page content */}
                <Box className="my-2 mx-4 grow h-full overflow-hidden">
                    {children}
                </Box>

            </Box>
            {/* dashboard page */}
        </div>
    )
} 