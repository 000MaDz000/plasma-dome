import { getMessages, getTranslations } from "next-intl/server";
import Header from "../_components/header";
import LoginButton from "../_components/login-button";
import SignupButton from "../_components/signup-button";
import Image from "next/image";
import i from "../../../public/h.jpeg";
import SurviceCard from "../_components/survice-card";
import { Footer } from "flowbite-react";
import LandingHeaderMenu from "../_components/landing-header-menu";
import { NextIntlClientProvider } from "next-intl";
import { FaFacebookF, FaTwitter } from "react-icons/fa6";
import { FaFacebookSquare, FaTwitterSquare } from "react-icons/fa";

export default async function Index() {
    const t = await getTranslations("Index");

    return (
        <main className="min-w-screen min-h-screen flex flex-col gap-10">
            <NextIntlClientProvider messages={await getMessages()}>

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

                <section className="text-slate-950 grid gap-3 justify-center items-center mx-2 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                    <SurviceCard content="pick your home color" title="Paints" icon="/r.png" />
                    <SurviceCard content="pick your home color" title="Paints" icon="/h.jpeg" />
                    <SurviceCard content="pick your home color" title="Paints" icon="/k.jpeg" />
                </section>


                <Footer className="bg-slate-600 text-white font-serif p-4">

                    <Footer.LinkGroup title={t("footer.contact")} itemType="link" className="flex flex-col w-fit">
                        <Footer.Title title={t("footer.contact")} className="font-semibold text-center" />
                        <Footer.Link href="www.facebook.com/plasmadome" title="contact on facebook" className="flex flex-row gap-2" >
                            <div className="flex items-center gap-1">
                                <FaFacebookSquare />
                                {t("footer.facebook")}
                            </div>
                        </Footer.Link>
                        <Footer.Link href="www.twitter.com/plasmadome" title="contact on twitter" >
                            <div className="flex items-center gap-1">
                                <FaTwitterSquare />
                                {t("footer.twitter")}
                            </div>

                        </Footer.Link>
                    </Footer.LinkGroup>

                    <Footer.Divider className="my-3" />
                    <Footer.Title title="Copyright" />
                    <Footer.Copyright by="MaDz" className="" />
                </Footer>

            </NextIntlClientProvider>

        </main>
    )

}