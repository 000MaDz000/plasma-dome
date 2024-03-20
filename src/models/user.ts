import mongoose, { Model } from "mongoose";

export interface IUser {
    firstname: string,
    lastname: string,
    username: String,
    password: string,
    email: string,
    mobile?: string,
    createdAt: string,
    permissions: { name: string, granted: boolean, reason?: string }[],
}

const UserSchema = new mongoose.Schema<IUser>({

    firstname: { type: String, required: true },
    lastname: { type: String, required: true },
    username: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    email: { type: String, lowercase: true, required: true },
    mobile: { type: String },
    createdAt: Date,
    permissions: { type: [{ name: String, granted: Boolean, reason: String }], default: [] },
});

const User = mongoose.model('User', UserSchema) as Model<IUser>;
export default User;