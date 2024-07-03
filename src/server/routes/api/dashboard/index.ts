import { Router } from "express";
import OrdersRoute from "./orders";
import SalesRoute from "./sales";

const DashboardRoute = Router();

DashboardRoute.use("/orders", OrdersRoute);
DashboardRoute.use("/sales", SalesRoute);

export default DashboardRoute;