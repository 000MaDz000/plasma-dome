
import { Box } from "@mui/material";
import Header from "./header";
import StoreHeaderComponents from "./store-header.components";
import StoreMenuDrawer from "./store-menu-drawer";

export default async function StoreHeader() {

    return (
        <Header className="bg-none bg-white shadow-sm bg-opacity-100 z-50">

            <Box className="justify-end items-center gap-5 grid-cols-3 hidden md:flex" >
                <StoreHeaderComponents />
            </Box>


            <Box className="md:hidden">
                <StoreMenuDrawer />
            </Box>
        </Header>
    )

}