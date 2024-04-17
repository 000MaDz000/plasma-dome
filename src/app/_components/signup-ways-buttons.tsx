import FbSignupButton from "./fb-signup-bottun";
import GoogleSignupButton from "./google-signup-button";

export default function SignupWaysButtons() {
    return (
        <div className="flex flex-col gap-2 items-center p-2 w-full">
            <GoogleSignupButton />
            <FbSignupButton />
        </div>
    )
}