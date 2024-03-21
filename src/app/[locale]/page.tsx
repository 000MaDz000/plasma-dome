import Header from "../_components/header";
import LoginButton from "../_components/login-button";
import SignupButton from "../_components/signup-button";

export default function Index() {

    return (
        <main>
            <Header>
                <div className="flex gap-4">
                    <SignupButton />
                    <LoginButton />
                </div>
            </Header>
        </main>
    )
}