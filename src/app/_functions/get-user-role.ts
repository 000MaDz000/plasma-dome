import { IUser } from "@/models/user";

export default function getUserRole(user: IUser) {

    let permission = "customer";

    for (let p of user.permissions) {
        if (p.name == "admin") {
            permission = "admin";
        }
        else if (p.name == "employee" && permission !== "admin") {
            permission = "employee";
        }
    }

    return permission;
}