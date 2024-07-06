import express, { Router } from "express";
import ProductsRoute from "./products";
import DashboardRoute from "./dashboard";

const ApiRoute = Router();
ApiRoute.use(express.json());
ApiRoute.use("/products", ProductsRoute);
ApiRoute.use("/dashboard", DashboardRoute);

export default ApiRoute;