import { IOrder, IOrderStatus } from "@/models/order";
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

    async updateCategories(productId: string, categories: string[]) {
        try {
            const body = {
                categories: categories.join(",")
            }

            const res = await fetch("/api/products/" + productId, {
                method: "put",
                body: JSON.stringify(body),
                headers: {
                    "Content-Type": "application/json"
                }
            });

            return res.status;
        }
        catch (err) {
            return 400
        }
    }

    async updateData(productId: string, data: { price?: string, name?: string, discount?: string, description?: string }) {
        try {
            const body: any = {};
            if (data.price) body.price = data.price;
            if (data.name) body.name = data.name;
            if (data.discount) body.discount = data.discount;
            if (data.description) body.description = data.description;

            const res = await fetch("/api/products/" + productId, {
                method: "put",
                body: JSON.stringify(body),
                headers: {
                    "Content-Type": "application/json",
                }
            });

            return res.status;
        }
        catch (err) {
            return 400;
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

    async updateStatus(orderId: string, status: IOrderStatus) {
        try {
            const res = await fetch("/api/dashboard/orders/" + orderId, {
                body: JSON.stringify({ status }),
                method: "put",
                headers: {
                    "Content-Type": "application/json",
                },
            });

            return res.status;
        }
        catch (err) {
            return 400;
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

export class AdvertismentApi {
    constructor(public adId: string) { }

    async delete() {
        const res = await fetch(`/api/dashboard/ads/${this.adId}`, { method: "delete" });
        return res.status;
    }

    async setStatus(newStatus: boolean) {
        const res = await fetch(`/api/dashboard/ads/${this.adId}/${newStatus}`, { method: "put" });
        return res.status;
    }


    static async getAll() {
        try {
            return await fetch("/api/dashboard/ads/").then(r => r.json());
        }
        catch (err) {
            return [];
        }
    }
}