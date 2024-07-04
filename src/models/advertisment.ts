import { Model, model, Schema } from "mongoose";
import { IImage } from "./image";

export interface IAdvertisment {
    barName: "" | "" | "",
    link: string;
    images: Schema.Types.ObjectId[],
    createdAt: Date,
}

export interface IPopulatedAdvertisments extends Omit<IAdvertisment, "images"> {
    images: IImage[];
}

const AdvertismentSchema = new Schema<IAdvertisment>({
    barName: String,
    link: String,
    images: {
        ref: "Image",
        type: [{ type: Schema.Types.ObjectId }],
        required: true,
    },


    createdAt: {
        type: Date,
        default: Date.now
    },
});

const Advertisment = model("Advertisment", AdvertismentSchema) as Model<IAdvertisment>;
global.models.Advertisment = Advertisment;
export default Advertisment;