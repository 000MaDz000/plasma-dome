import { IOrder } from "@/models/order";

export default function formatOrderChartData(data: IOrder[]): number[] {
    const formated = new Array(31);
    formated.fill(0);

    for (let order of data) {
        const index = new Date(order.orderDate).getDate();
        formated[index] ? formated[index] += order.totalPrice : formated[index] = order.totalPrice;
    }

    return formated;
}