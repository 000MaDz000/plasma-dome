import MongoStore from "connect-mongo";
import { StatisticsModelType, ImageModelType, ProductModelType, UserModelType, AdvertismentModelType } from "../src/models/index"
import { ICartProduct } from "@/app/_actions/get-cart-data";
import { OrderModelType } from "@/models/order";
declare global {
    var models: {
        User?: UserModelType;
        Advertisment?: AdvertismentModelType;
        Product?: ProductModelType;
        Image?: ImageModelType;
        Order?: OrderModelType;
        Statistics?: StatisticsModelType;
    },

    var appSessions: MongoStore
    var signedCookie: (cookie: string, secret: string | string[]) => string | false;
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
    password: string,
    verifyCode?: string,
    codeVeryfied?: boolean;
    role?: "admin";
}

export interface CartData {
    products: ICartProduct[]
}