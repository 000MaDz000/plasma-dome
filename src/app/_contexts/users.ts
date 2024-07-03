import { IUser } from "@/models/user";
import { createContext } from "react";

type UsersContextType = {
    admins: {
        data: IUser[],
        increase: () => void,
        replaceRole: (user: IUser, targetRole: "admin" | "customer" | "employee") => void
    },
    customers: {
        data: IUser[],
        increase: () => void,
        replaceRole: (user: IUser, targetRole: "admin" | "customer" | "employee") => void
    },
    employees: {
        data: IUser[],
        increase: () => void,
        replaceRole: (user: IUser, targetRole: "admin" | "customer" | "employee") => void
    }
}

const Users = createContext<UsersContextType>({
    admins: { data: [], increase: () => { }, replaceRole: () => { } },
    employees: { data: [], increase: () => { }, replaceRole: () => { } },
    customers: { data: [], increase: () => { }, replaceRole: () => { } },
});

export default Users;