import { GhostModelType, ImageModelType, InvoiceModelType, ProductModelType, UserModelType } from "../src/models/index"
declare global {
    var models: {
        User?: UserModelType;
        Invoice?: InvoiceModelType;
        Product?: ProductModelType;
        Image?: ImageModelType;
        Ghost?: GhostModelType;
    }
}