import LoginAlert from "@/app/_components/login-alert";
import StoreBody from "@/app/_components/store-body";
import StoreFooter from "@/app/_components/store-footer";
import StoreHeader from "@/app/_components/store-header";
import session from "@/app/_functions/session";
import { Box } from "@mui/material";

export default async function HomePage() {
    const sess = await session();


    return (
        <Box>
            <StoreHeader />
            <StoreBody />
            {
                !sess.data.authorized && (
                    <Box className="m-11">
                        <LoginAlert />
                    </Box>
                )
            }
            <StoreFooter />
        </Box>
    )
}