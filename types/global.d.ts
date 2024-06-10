import MongoStore from "connect-mongo";
import { GhostModelType, ImageModelType, InvoiceModelType, ProductModelType, UserModelType } from "../src/models/index"
import { UserInfo } from "os";
declare global {
    var models: {
        User?: UserModelType;
        Invoice?: InvoiceModelType;
        Product?: ProductModelType;
        Image?: ImageModelType;
        Ghost?: GhostModelType;
    },

    var appSessions: MongoStore
}

declare module "express-session" {
    interface SessionData {
        user: UserInfo;
        authorized?: boolean;
    }
}