import { Product, Image } from "../../../models/";
import { Request, Response, Router } from "express";
import { ObjectId, UUID } from "bson";
import { ICartProduct } from "@/app/_actions/get-cart-data";
import multer from "multer";
import { randomUUID } from "crypto";
import { join } from "path";
import { writeFile } from "fs/promises";
import FilterProduct from "../../../app/_functions/filter-product";

const ProductsRoute = Router();

ProductsRoute.get("/?", async (req: Request<{}, {}, {}, { lastId?: string }>, res) => {

    try {
        let products = [];

        if (req.query.lastId && req.query.lastId.length == 24) {

            const data = await Product.find({
                _id: {
                    $gt: new ObjectId(req.query.lastId),
                }
            }).populate("images").limit(20);


            products = data;
        }
        else {
            const data = await Product.find().populate("images").limit(20);
            products = data;
        }

        res.json(products.map(p => FilterProduct(p as any)));
    }
    catch (err) {
        console.log(err);

        res.json([]);
    }
});

ProductsRoute.post("/", multer().single("images"), async (req: Request<{}, {}, Omit<Omit<ICartProduct, "images">, "_id">>, res: Response) => {
    try {
        const data = req.body;
        console.log(data);
        data.price = parseFloat(data.price as unknown as string);

        if (!req.file) {
            console.log("file");

            return res.sendStatus(400)
        };

        if (!data.categories) {
            console.log("categories");
            return res.sendStatus(400);
        };

        if (typeof data.name !== "string" || isNaN(data.price) || typeof data.description !== "string") {
            console.log("name or price or description");

            return res.sendStatus(400);
        };
        const imgName = randomUUID() + req.file.originalname.slice(req.file.originalname.lastIndexOf("."));
        const imgPath = join(__dirname, "../../../../images/", imgName);
        await writeFile(imgPath, req.file.buffer);

        const image = new Image({ "relativePath": "/images/" + imgName, "relativeUrl": "/images/" + imgName });
        await image.save();

        const saveProduct = new Product({
            "categories": data.categories,
            "description": data.description,
            "name": data.name,
            "price": data.price,
            images: [image._id],
        });

        await saveProduct.save();
        res.sendStatus(200);
    }
    catch (err) {
        res.sendStatus(500);
        console.log(err);
    }
});

export default ProductsRoute;