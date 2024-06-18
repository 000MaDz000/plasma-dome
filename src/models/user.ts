import mongoose, { Model } from "mongoose";

export interface IUser {
    name: string;
    password?: string,
    email: string,
    mobile?: string,
    createdAt: string,
    verifyCode?: string,
    permissions: { name: string, granted: boolean, reason?: string }[],
}

const UserSchema = new mongoose.Schema<IUser>({
    name: { type: String },
    password: { type: String },
    email: { type: String, lowercase: true, required: true },
    mobile: { type: String, required: true },
    createdAt: Date,
    verifyCode: { type: String },
    permissions: { type: [{ name: String, granted: Boolean, reason: String }], default: [] },
});

const User = mongoose.model('User', UserSchema) as Model<IUser>;

global.models.User = User;
export default User;