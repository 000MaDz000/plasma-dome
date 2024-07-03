import { Router } from "express";
import OrdersRoute from "./orders";
import SalesRoute from "./sales";
import UsersRoute from "./users";

const DashboardRoute = Router();

DashboardRoute.use("/orders", OrdersRoute);
DashboardRoute.use("/sales", SalesRoute);
DashboardRoute.use("/users", UsersRoute);

export default DashboardRoute;