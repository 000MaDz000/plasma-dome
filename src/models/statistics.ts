import { Model, model, Schema } from "mongoose";

const getCurrentYear = () => new Date().getUTCFullYear();
const getCurrentMonth = () => new Date().getUTCMonth() + 1;
const getCurrentDay = () => new Date().getUTCDate();
type IStatisticsNames =
    "totalProducts" | // the total products count in the store
    "normalProducts" | // the normal products count in the store
    "featuredProducts" | // the total featured products in the store
    "totalOrders" | // the total orders in the store
    "liveOrders" | // orders that's not ended yet
    "endedOrders" | // orders that's already ended
    "customers" | // the customers count
    "images" | // the images count
    "totalSalesValue" | // the total sales value represents the total money that's accepted
    "salesValue" |  // the accepted money of the sales
    "sales"; // total sales in the store

export interface IStatistics {
    name: IStatisticsNames;
    count: number;
    date: {
        year: number;
        month: number;
        day: number;
    };
}

const CountsSchema = new Schema<IStatistics>({
    name: {
        type: String,
        require: true,
    },
    count: {
        type: Number,
        require: true,
    },
    date: {
        year: {
            type: Number,
            default: getCurrentYear
        },
        month: {
            type: Number,
            default: getCurrentMonth
        },
        day: {
            type: Number,
            default: getCurrentDay,
        },
    }
});


CountsSchema.index({ name: 1, "date.year": -1, "date.month": -1, "date.day": -1 }); // latest counts first

const Statistics = model("Counts", CountsSchema) as Model<IStatistics>;
global.models.Statistics = Statistics;
export default Statistics;

/**
 * -- IMPORTANT TO KNOW --
 * when the data is global like products, we will change the value only, and will not add a new document depends on the date
 * if the data represents statistics data, like sales count or orders or sales, or sales values, this data will change from day to other
 * this mean static data will be stored in one document, and other changable data will be stored in many dated documents in reversed order
 */