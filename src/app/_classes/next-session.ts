import { SessionData } from "express-session";

export default class NextSession {

    constructor(public sessionId: string, public data: SessionData) {

        if (!this.data) {
            this.data = {} as unknown as any;
        }

        if (!this.data.cart) {
            this.data.cart = { products: [] }
        }
    }



    save() {
        appSessions.set(this.sessionId, this.data);
    }
}