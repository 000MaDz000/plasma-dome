import { Model, model, Schema } from "mongoose";

// ghost user data
export interface IGhost {
    name: string;
    communicationData: string; // email or mobile
    communicationDataType: "email" | "mobile";
    code?: string; // verification code
    created_at: Date;
    updated_at: Date | null;
}


const GhostSchema = new Schema({
    name: String,
    communicationData: String,
    communicationDataType: {
        type: String,
        enum: ["email", "mobile"],
        default: "email"
    },
    code: {
        type: String,
        default: null
    },
    created_at: {
        type: Date,
        default: Date.now
    },
    updated_at: {
        type: Date,
        default: null
    }
});

const GhostModel = model("Ghost", GhostSchema) as Model<IGhost>;

global.models.Ghost = GhostModel;
export default GhostModel;