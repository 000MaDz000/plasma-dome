import { Toolbar, IconButton, InputAdornment, Input, Tooltip } from "@mui/material";
import { getTranslations } from "next-intl/server";
import { BiSearch } from "react-icons/bi";
import { FaMotorcycle } from "react-icons/fa";
import Header from "./header";
import StoreCartIcon from "./store-cart-icon";

export default async function StoreHeader() {
    const t = await getTranslations("Store.header");

    return (
        <Header className="bg-none bg-white shadow-sm bg-opacity-100 z-50">

            <Toolbar className="flex justify-end items-center gap-5 grid-cols-3" variant="regular">

                <StoreCartIcon />

                <Tooltip title={t("your orders")}>
                    <IconButton>
                        <FaMotorcycle />
                    </IconButton>
                </Tooltip>


                <Input
                    startAdornment={(
                        <InputAdornment position="start">
                            <BiSearch />
                        </InputAdornment>
                    )}
                    placeholder={t("searchPlaceholder")}
                />
            </Toolbar>
        </Header>
    )

}