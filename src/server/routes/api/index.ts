import { Router } from "express";
import ProductsRoute from "./products";

const ApiRoute = Router();

ApiRoute.use("/products", ProductsRoute)

export default ApiRoute;