import mongoose, { Model } from "mongoose";

export type UserPermissionName = "customer" | "admin" | "employee";

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
    email: { type: String, lowercase: true, required: false },
    mobile: { type: String, required: true },
    createdAt: Date,
    verifyCode: { type: String },
    permissions: { type: [{ name: String, granted: Boolean, reason: String }], default: [] },
});

const User = mongoose.model('User', UserSchema) as Model<IUser>;
UserSchema.index({ mobile: 1 });
UserSchema.index({ email: 1 });
UserSchema.index({ createdAt: 1 });
UserSchema.index({ "permissions.name": 1, "permissions.granted": 1 });
global.models.User = User;
export default User;