import { Request, Router } from "express";
import OrdersRoute from "./orders";


const DashboardRoute = Router();

DashboardRoute.use("/orders", OrdersRoute);

export default DashboardRoute;