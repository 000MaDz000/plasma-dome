import { IAdvertisment } from "@/models/advertisment";
import { Box } from "@mui/material";
import { useMemo } from "react";

export default function Banner({ bannerData }: { bannerData: Omit<IAdvertisment, "images"> & { images: string[] } }) {
    const imgs = useMemo(() => bannerData.images.map(val => {
        const imgURL: string = "/images/" + val.slice(0, val.lastIndexOf("."))
        return imgURL;
    }), [bannerData]);


    return (
        <Box className="flex w-full">
            {imgs.map(img => <img src={img} alt="" key={img} className="w-full max-h-96" />)}
        </Box>
    )
}

