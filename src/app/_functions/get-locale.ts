import { cookies } from "next/headers";

export default function getLocale() {
    return cookies().get("NEXT_LOCALE")?.value || "en";
}