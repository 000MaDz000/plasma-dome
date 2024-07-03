'use client';

import { ReactNode, useMemo, useState } from "react";
import Users from "../_contexts/users";
import { IUser } from "@/models/user";
import { Users as UsersApi } from "@/app/_classes/api";
import getUserRole from "../_functions/get-user-role";

export default function UsersProvider({ children }: { children: ReactNode }) {
    const [admins, setAdmins] = useState<IUser[]>([]);
    const [customers, setCustomers] = useState<IUser[]>([]);
    const [employees, setEmployees] = useState<IUser[]>([]);
    const api = useMemo(() => new UsersApi(), []);

    const increaseEmployees = async () => {
        api.fetchEmployees().then((data) => {
            setEmployees([...employees, ...data]);
        });
    }

    const increaseCustomers = () => {
        api.fetchCustomers().then((data) => {
            setCustomers([...customers, ...data]);
        });
    }

    const increaseAdmins = () => {
        api.fetchAdmins().then((data) => {
            setAdmins([...admins, ...data]);
        });
    }

    const replaceRole = (user: IUser, targetRole: string) => {

        const role = getUserRole(user);
        if (role == targetRole) {
            return;
        }

        switch (targetRole) {
            case "employee":
                if (role == "admin") {
                    api.updateAdminRole((user as any)._id, "unrole");
                    setAdmins(admins.filter(val => (val as any)._id !== (user as any)._id))
                }
                else if (role == "customer") {
                    setCustomers(customers.filter(val => (val as any)._id !== (user as any)._id));
                }

                api.updateEmployeeRole((user as any)._id, "role").then(console.log);
                setEmployees([{ ...user, permissions: [{ "name": "employee", granted: true }] }, ...employees])
                break;


            case "admin":
                if (role == "customer") {
                    setCustomers(customers.filter(val => (val as any)._id !== (user as any)._id))
                }
                else if (role == "employee") {
                    api.updateEmployeeRole((user as any)._id, "unrole");
                    setEmployees(employees.filter(val => (val as any)._id !== (user as any)._id))
                }

                api.updateAdminRole((user as any)._id, "role");
                setAdmins([{ ...user, permissions: [{ name: "admin", granted: true }] }, ...admins]);
                break;


            case "customer":
                if (role == "admin") {
                    api.updateAdminRole((user as any)._id, "unrole");
                    setAdmins(admins.filter(val => (val as any)._id !== (user as any)._id))
                }
                else if (role == "employee") { // remove employee role
                    api.updateEmployeeRole((user as any)._id, "unrole");
                    setEmployees(employees.filter(val => (val as any)._id !== (user as any)._id))
                }

                setCustomers([{ ...user, permissions: [] }, ...customers]);
                break;
        }
    }

    return (
        <Users.Provider value={
            {
                admins: {
                    data: admins,
                    increase: increaseAdmins,
                    replaceRole: replaceRole,
                },
                customers: {
                    data: customers,
                    increase: increaseCustomers,
                    replaceRole: replaceRole,
                },
                employees: {
                    data: employees,
                    increase: increaseEmployees,
                    replaceRole: replaceRole,
                }
            }
        }>
            {children}
        </Users.Provider>
    )

}