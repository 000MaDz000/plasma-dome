import { SessionData } from "express-session";
import { cookies } from "next/headers";
import NextSession from "../_classes/next-session";

export default async function session() {
    const cookie = cookies();
    const sid = cookie.get("connect.sid")?.value || "";
    const sessionData: SessionData | null | undefined = await new Promise(r => {
        appSessions.get(sid, (err, sess) => {
            r(sess);
        });
    });

    return new NextSession(sid, sessionData as SessionData);
}