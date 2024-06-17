import { ICartProduct } from "../_actions/get-cart-data";

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