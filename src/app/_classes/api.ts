import { IOrder } from "@/models/order";
import { ICartProduct } from "../_actions/get-cart-data";
import { IStatistics } from "@/models/statistics";

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

}

export class OrdersApi {
    private lastFetchId: string | null;

    constructor() {
        this.lastFetchId = null;
    }

    async fetchOrders({ month, ended }: Partial<{ month: number, ended: boolean }> = {}) {
        try {

            let orders = await fetch(`/api/dashboard/orders/?${this.lastFetchId ? `/?lastId=${this.lastFetchId}&` : ""}${month ? `month=${month}&` : ""}${ended ? "ended=true" : ""}`).then(res => res.json()) as IOrder[];
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
}