import { Box, Typography } from "@mui/material";

export default function StoreFooter() {
    return (

        <Box className="min-h-80 bg-gray-200 mt-9 grow p-7">
            <Typography variant="h5">Copyright by MaDz</Typography>
            <Typography variant="h5">contact: <a href="https://wa.me/01155029839" className="text-sky-600">Whatsapp</a></Typography>
        </Box>
    )
}