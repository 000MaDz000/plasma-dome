import { Footer, FooterTitleProps } from "flowbite-react";
import { FC } from "react";

const FooterTitle: FC<FooterTitleProps> = function FooterTitle(props) {
    return (
        <Footer.Title {...props} className={(props.className || "") + " font-semibold text-center"} />
    )
}
export default FooterTitle;