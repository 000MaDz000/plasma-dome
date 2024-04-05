import { Footer, FooterLinkGroupProps } from "flowbite-react";

export default function LinkGroup(props: FooterLinkGroupProps) {
    return (
        <Footer.LinkGroup {...props} className={(props.className || "") + " flex flex-col w-fit mx-auto md:mx-0 items-center"} />
    )
}