import LoginForm from "@/app/_components/login-form";
import session from "@/app/_functions/session";
import { redirect } from "next/navigation";

export default async function LoginPage() {
    const sess = await session();
    if (sess.data.authorized) {
        if (sess.data.user.role == "admin") {
            redirect("/dashboard");
        }
        else {
            redirect("/store");
        }
    }
    return (
        <div>
            <LoginForm />
        </div>
    )
}