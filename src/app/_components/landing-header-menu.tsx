'use client';
import { Dropdown } from "flowbite-react";
import LandingHeaderMenuTrigger from "./landing-header-menu-trigger";
import SignupButton from "./signup-button";
import LoginButton from "./login-button";

export default function LandingHeaderMenu() {
    return (
        <div className="flex items-center justify-center">
            <Dropdown label="" className="p-2 border-none outline-none rounded-md" renderTrigger={LandingHeaderMenuTrigger}>
                <Dropdown.Item className="bg-purple-800 bg-opacity-50 hover:bg-opacity-100 my-2 rounded-sm border-purple-700 text-white transition-colors">
                    <SignupButton isMenu />
                </Dropdown.Item>

                <Dropdown.Item className="bg-purple-800 bg-opacity-50 hover:bg-opacity-100 my-2 rounded-sm border-purple-700 text-white transition-colors">
                    <LoginButton isMenu />
                </Dropdown.Item>
            </Dropdown>
        </div>
    )
}