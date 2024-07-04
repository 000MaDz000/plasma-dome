import { Router } from "express";
import OrdersRoute from "./orders";
import SalesRoute from "./sales";
import UsersRoute from "./users";
import AdsRoute from "./ads";

const DashboardRoute = Router();

DashboardRoute.use("/orders", OrdersRoute);
DashboardRoute.use("/sales", SalesRoute);
DashboardRoute.use("/users", UsersRoute);
DashboardRoute.use("/ads", AdsRoute);

export default DashboardRoute;