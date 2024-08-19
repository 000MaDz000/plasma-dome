import { SessionData } from "express-session";
import { cookies } from "next/headers";
import NextSession from "../_classes/next-session";
import { signedCookie } from "cookie-parser";
// import appSessions from "@/server";

export default async function session() {
    const cookie = cookies();
    const unParserSid = cookie.get("connect.sid")?.value || "";
    const sid = signedCookie(unParserSid, process.env.COOKIES_SECRET_KEY as string) as string;
    // const sid = unParserSid;

    const sessionData: SessionData | null | undefined = await new Promise(r => {
        appSessions.get(sid, (_err, sess) => {
            r(sess as SessionData);
        });
    }) as SessionData;

    return new NextSession(sid, { ...sessionData } as SessionData);
}