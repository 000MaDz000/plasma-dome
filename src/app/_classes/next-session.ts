import { SessionData } from "express-session";

export default class NextSession {

    constructor(public sessionId: string, public data: SessionData) {

        if (!this.data) {
            this.data = {} as unknown as any;
        }

        if (!this.data.cart) {
            this.data.cart = { products: [] }
        }

        if (!this.data.user) {
            this.data.user = {} as unknown as any;
        }
    }



    async save() {
        console.log(this.sessionId);

        await new Promise(r => {
            appSessions.set(this.sessionId, this.data, () => r(null));
        });


    }
}