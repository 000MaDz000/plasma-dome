import { getTranslations } from "next-intl/server";
import Header from "../_components/header";
import LoginButton from "../_components/login-button";
import SignupButton from "../_components/signup-button";
import Image from "next/image";
import i from "../../../public/h.jpeg";
import { Footer } from "flowbite-react";
import LandingHeaderMenu from "../_components/landing-header-menu";
import TermsLinks from "../_components/terms-links";
import ContactLinks from "../_components/contact-links";
import SurviceCards from "../_components/survice-cards";

export default async function Index() {
    const t = await getTranslations("Index");

    return (
        <main className="min-w-screen min-h-screen flex flex-col gap-10">

            <section className="relative bg-gradient-to-bl from-gray-800 to-gray-700 via-purple-900 min-h-[70vh] shadow-lg overflow-hidden text-slate-300">

                <Header>
                    <div className="gap-4 hidden sm:flex">
                        <SignupButton />
                        <LoginButton />
                    </div>

                    {/* for phones */}
                    <div className="gap-4 flex sm:hidden">
                        <LandingHeaderMenu />
                    </div>
                </Header>

                <div className="flex flex-col md:flex-row gap-4 w-[100vw] grow container mx-auto px-2 py-8 items-center ">
                    <div className="grow [&>h1]:leading-10 flex flex-col justify-center">
                        <h1 className="text-4xl text-slate-200 text-nowrap">{t("body.header")}</h1>
                        <h1 className="text-xl">{t("body.line1")}</h1>
                    </div>

                    <div className="flex justify-start items-start my-5 mx-auto overflow-hidden md:w-1/2">
                        <Image src={i} alt="" className="w-full" />
                    </div>
                </div>
            </section>

            <h1 className="text-4xl font-semibold mx-8">{t("sections")}</h1>
            <section className="text-slate-950 grid gap-3 justify-center items-center mx-2 [grid-template-columns:repeat(auto-fit,minmax(21rem,1fr))]">
                <SurviceCards />
            </section>


            <Footer className="bg-slate-600 text-white font-serif p-4 flex flex-col md:flex-row gap-8 items-start justify-around">
                <ContactLinks />
                <TermsLinks />
            </Footer>


        </main>
    )

}