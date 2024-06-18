import StoreBody from "@/app/_components/store-body";
import StoreHeader from "@/app/_components/store-header";
import { Box } from "@mui/material";

export default async function HomePage() {

    return (
        <Box>
            <StoreHeader />
            <StoreBody />
        </Box>
    )
}