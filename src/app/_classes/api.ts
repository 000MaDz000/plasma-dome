import { IOrder } from "@/models/order";
import { ICartProduct } from "../_actions/get-cart-data";
import { IStatistics } from "@/models/statistics";
import { IUser } from "@/models/user";


export class ProductsApi {
    private lastFetchId: string | null;
    constructor() {
        this.lastFetchId = null;
    }

    async fetchProducts() {
        if (this.lastFetchId) {
            console.log(this.lastFetchId);

            return await fetch("/api/products/?lastId=" + this.lastFetchId)
                .then(res => res.json())
                .then((val: ICartProduct[]) => {
                    this.lastFetchId = val[val.length - 1]?._id || this.lastFetchId;
                    return val;
                });
        }
        else {
            return await fetch("/api/products?")
                .then(res => res.json())
                .then((val: ICartProduct[]) => {
                    this.lastFetchId = val[val.length - 1]?._id || this.lastFetchId;
                    return val;
                });
        }
    }

    async fetchStatistics(): Promise<{ normalProducts: number; featuredProducts: number; totalProducts: number }> {
        try {

            return await fetch("/api/products/statistics").then(r => r.json());
        }
        catch (err) {
            return {
                normalProducts: 0,
                featuredProducts: 0,
                totalProducts: 0,
            }
        }
    }

}

export class OrdersApi {
    private lastFetchId: string | null;

    constructor() {
        this.lastFetchId = null;
    }

    async fetchOrders({ month, ended }: Partial<{ month: number, ended: boolean }> = {}) {
        try {

            const orders = await fetch(`/api/dashboard/orders/?${this.lastFetchId ? `/?lastId=${this.lastFetchId}&` : ""}${month ? `month=${month}&` : ""}${ended ? "ended=true" : ""}`).then(res => res.json()) as IOrder[];
            this.lastFetchId = orders[orders.length - 1]._id;


            return orders;
        }
        catch (err) {
            return [];
        }
    }

    async fetchStatistics(year?: number) {
        try {
            const statistics = await fetch(`/api/dashboard/orders/statistics/?${year ? ("year=" + year) : ""}`).then(r => r.json()) as IStatistics<"endedOrders">[];
            return statistics;
        }
        catch (err) {
            return [];
        }
    }

    static async getSalesStatistics() {
        try {
            const data = await fetch("/api/dashboard/sales/statistics/values").then(r => r.json());
            return data;
        }
        catch (err) {
            return []
        }
    }
}

export class Users {
    private lastCustomerId: string | null;
    private lastEmployeeId: string | null;
    private lastAdminId: string | null;

    constructor() {
        this.lastCustomerId = null;
        this.lastEmployeeId = null;
        this.lastAdminId = null;
    }

    async fetchCustomers() {
        try {
            const customers = await fetch(`/api/dashboard/users/customers?${this.lastCustomerId ? `lastId=${this.lastCustomerId}&` : ""}`).then(res => res.json()) as IUser[];
            if (customers.length) {
                this.lastCustomerId = (customers[customers.length - 1] as any)._id as string;
            }

            return customers;
        }
        catch (err) {
            return []
        }
    }

    async fetchEmployees() {
        try {
            const employees = await fetch(`/api/dashboard/users/employees?${this.lastEmployeeId ? `lastId=${this.lastEmployeeId}&` : ""}`).then(res => res.json()) as IUser[];
            if (employees.length) {
                this.lastEmployeeId = (employees[employees.length - 1] as any)._id as string;
            }
            return employees;
        }
        catch (err) {
            return []
        }
    }

    async fetchAdmins() {
        try {
            const admins = await fetch(`/api/dashboard/users/admins?${this.lastAdminId ? `lastId=${this.lastAdminId}&` : ""}`).then(res => res.json()) as IUser[];
            if (admins.length) {
                this.lastAdminId = (admins[admins.length - 1] as any)._id as string;
            }
            return admins;
        }
        catch (err) {
            return []
        }
    }

    async updateAdminRole(userId: string, role: "role" | "unrole") {
        try {
            const res = await fetch(`/api/dashboard/users/admins?userId=${userId}&role=${role}`, { method: "put" });
            return res.status;
        }
        catch (err) {
            return 400;
        }
    }

    async updateEmployeeRole(userId: string, role: "role" | "unrole") {
        try {
            const res = await fetch(`/api/dashboard/users/employees?userId=${userId}&role=${role}`, { method: "put" });
            return res.status;
        }
        catch (err) {
            return 400;
        }
    }

}