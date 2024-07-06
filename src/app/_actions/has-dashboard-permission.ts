'use server';

import { IUser } from "@/models/user";

const DashboardPermissions = {
    admin: true,
    employee: true,
};

export default async function hasDashboardPermission(user: IUser) {
    if (user.mobile === process.env.ROOT_ADMIN_ACCOUNT_PHONE_NUMBER) return "admin";
    for (let p of user.permissions) if (p.name in DashboardPermissions && p.granted) return p.name;
    return false;
}