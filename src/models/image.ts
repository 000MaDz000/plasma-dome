import mongoose, { Model, ObjectId } from "mongoose";
export interface IImage {
    relativePath: string;
    relativeUrl: string;
    canAccess: ObjectId[],
}
const ImageSchema = new mongoose.Schema<IImage>({
    relativePath: {
        type: String,
        required: true,
    },
    relativeUrl: {
        type: String,
        required: false,
    },
    canAccess: [{
        ref: "User",
        type: mongoose.Schema.Types.ObjectId,
    }],
});

ImageSchema.index({ "relativeUrl": 1 });
ImageSchema.index({ "relativePath": 1 });
const Image = mongoose.model("Image", ImageSchema) as Model<IImage>;
global.models.Image = Image;
export default Image;