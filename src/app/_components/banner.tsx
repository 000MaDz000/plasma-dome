import { IAdvertisment } from "@/models/advertisment";
import { Box } from "@mui/material";
import { useMemo } from "react";

export default function Banner({ bannerData }: { bannerData: IAdvertisment }) {
    const imgs = useMemo(() => bannerData.images.map(val => {
        const imgURL: string = "/images/" + (val as any).slice(0, (val as any).lastIndexOf("."));
        return imgURL;
    }), [bannerData])


    return (
        <Box className="flex w-full">
            {imgs.map(img => <img src={img} alt="" key={img} />)}
        </Box>
    )
}

