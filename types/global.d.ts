import MongoStore from "connect-mongo";
import { GhostModelType, ImageModelType, InvoiceModelType, ProductModelType, UserModelType } from "../src/models/index"
import { ICartProduct } from "@/app/_actions/get-cart-data";
import { OrderModelType } from "@/models/order";
declare global {
    var models: {
        User?: UserModelType;
        Invoice?: InvoiceModelType;
        Product?: ProductModelType;
        Image?: ImageModelType;
        Ghost?: GhostModelType;
        Order?: OrderModelType;
    },

    var appSessions: MongoStore
}

declare module "express-session" {
    interface SessionData {
        user: UserInfo;
        authorized?: boolean;
        cart: CartData;
    }
}

export interface UserInfo {
    name: string,
    mobile: string,
    verifyCode?: string,
}

export interface CartData {
    products: ICartProduct[]
}