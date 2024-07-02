'use client';

import { IconButton } from "@mui/material";
import { useEffect, useState } from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

export default function ScrollLeftRightButtons({ parentId }: { parentId: string }) {
    const [disabled, setDisabled] = useState({ left: true, right: false });
    const [scrollDir, setScrollDir] = useState<"l" | "r">("r");

    const scroll = (dir: "r" | "l") => {
        const ele = document.getElementById(parentId);
        let leftScroll = 0;

        switch (dir) {
            case "l":
                leftScroll = -300;
                break;
            case "r":
                leftScroll = 300;
                break;
        }

        const fullScrolled = (ele?.scrollWidth || 0) - (ele?.scrollLeft || 0) == ele?.offsetWidth;


        if (fullScrolled) {
            // tracking the direction
            setScrollDir("l");
            setDisabled({
                left: false,
                right: true,
            });
        }
        else if (ele?.scrollLeft === 0) {

            // tracking the direction
            setScrollDir("r");

            setDisabled({
                left: true,
                right: false,
            });
        }
        else {
            if (disabled.left || disabled.right) {
                setDisabled({ left: false, right: false });
            }
        }

        ele?.scrollTo({
            top: 0,
            left: leftScroll + ele.scrollLeft,
            behavior: "smooth",
        });
    }

    const autoScrollTimeout = 4000; // in milliseconds


    useEffect(() => {
        const autoScrollInterval = setInterval(() => {
            scroll(scrollDir);
        }, autoScrollTimeout);

        return () => {
            clearInterval(autoScrollInterval);
        }
    });

    return (
        <div className="hidden md:block">
            <div className="absolute top-1/2 left-0 bg-slate-400 bg-opacity-45 rounded-full" onClick={() => scroll("l")}>
                <IconButton disabled={disabled.left}>
                    {/* onClick={scrollLeft} */}
                    <FaArrowLeft />
                </IconButton>
            </div>

            <div className="absolute top-1/2 right-0 bg-slate-400 bg-opacity-45 rounded-full" onClick={() => scroll("r")}>
                <IconButton disabled={disabled.right}>
                    <FaArrowRight />
                </IconButton>
            </div>
        </div>
    )
}