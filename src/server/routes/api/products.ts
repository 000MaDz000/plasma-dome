import { Product, Image, Statistics, Settings } from "../../../models/";
import { Request, Response, Router } from "express";
import { ObjectId } from "bson";
import multer from "multer";
import { randomUUID } from "crypto";
import { join } from "path";
import { writeFile } from "fs/promises";
import FilterProduct from "../../../app/_functions/filter-product";
import { IProduct } from "@/models/product";
import { IStatisticsName } from "@/models/statistics";
import DashboardLocker from "../lockers/pages/dashboard";
import { ISettingName } from "@/models/settings";

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

ProductsRoute.post("/", DashboardLocker, multer().single("images"), async (req: Request<{}, {}, Omit<Omit<Omit<IProduct, "images"> & { showType: string, showTypeLevel: string }, "_id">, "showTypes">>, res: Response) => {
    try {
        const data = req.body;
        data.price = parseFloat(data.price as unknown as string);

        // checking the data
        if (!req.file) {
            // console.log("File");
            return res.sendStatus(400)
        };

        if (!data.categories) {
            // console.log("categories");
            return res.sendStatus(400);
        };

        if (typeof data.name !== "string" || isNaN(data.price) || typeof data.description !== "string") {
            // console.log("name or descritpion");
            return res.sendStatus(400);
        };

        // crete the image
        const imgName = randomUUID() + req.file.originalname.slice(req.file.originalname.lastIndexOf("."));
        const imgPath = join(__dirname, "../../../../images/", imgName);
        await writeFile(imgPath, req.file.buffer);

        // set the image
        const image = new Image({ "relativePath": "/images/" + imgName, "relativeUrl": "/images/" + imgName });
        await image.save();

        // create the product show types
        const showTypes: any[] = [];

        if ((data.showType == "f" || data.showType == "n") && data.showTypeLevel && !isNaN(parseInt(data.showTypeLevel))) {
            showTypes.push({
                showType: data.showType == "f" ? "featured" : "normal",
                level: data.showTypeLevel,
            })
        }
        // create the product
        const categories = (data.categories as unknown as string).split(",").map(category => category.trim());

        const saveProduct = new Product({
            "categories": categories, // add the categories as array
            "description": data.description,
            "name": data.name,
            "price": data.price,
            images: [image._id],
            showTypes: showTypes,
        });


        const StatisticName1: IStatisticsName = "totalProducts";
        const StatisticName2: IStatisticsName = data.showType == "f" ? "featuredProducts" : "normalProducts";

        // statistics adding
        await Statistics.updateMany({
            name: StatisticName1,
        }, { $inc: { count: 1 } }, { upsert: true });

        await Statistics.updateMany({
            name: StatisticName2,
        }, { $inc: { count: 1 } }, { upsert: true });

        // adding the categories to the settings environment if not exists
        const categoriesName: ISettingName = "categories";
        await Settings.updateOne({
            "name": categoriesName
        }, { $addToSet: { value: categories, } }, { upsert: true });

        // save the product
        await saveProduct.save();

        res.status(200).redirect("/dashboard/products");
    }
    catch (err) {
        res.status(500).redirect("/dashboard/products");
        // console.log(err);
    }
});

ProductsRoute.get("/statistics", DashboardLocker, async (req, res) => {
    const data = {
        normalProducts: 0,
        featuredProducts: 0,
        totalProducts: 0,
    };
    try {
        const statisticNames: IStatisticsName[] = ["totalProducts", "normalProducts", "featuredProducts"];
        const statistics = Statistics.find({
            "name": {
                $in: statisticNames,
            }
        }).cursor()


        for await (let statistic of statistics) ((data as any)[statistic.name]) = statistic.count;

        res.json(data);
    }
    catch (err) {
        res.json(data);
    }
});

ProductsRoute.put("/:productId", DashboardLocker, async (req: Request<{ productId: string }, {}, { categories?: string, price?: string, name?: string, discount?: string, description?: string }>, res) => {
    try {
        // 24 is ObjectId hex characters length
        if (!req.params.productId || req.params.productId.length !== 24) return res.sendStatus(404);
        const product = await Product.findById(req.params.productId);
        if (!product) return res.sendStatus(404);

        if (req.body.categories && req.body.categories.length) {
            const splited = req.body.categories.split(",").map(category => category.trim());
            product.categories = splited;
        }

        if (req.body.name && req.body.name.length) product.name = req.body.name;
        if (req.body.price && !isNaN(parseFloat(req.body.price))) product.price = parseFloat(req.body.price);
        if (req.body.discount && !isNaN(parseFloat(req.body.discount))) product.discount = parseFloat(req.body.discount);
        if (req.body.description && req.body.description.length) product.description = req.body.description;

        await product.save();

        res.sendStatus(200);
    }
    catch (err) {
        console.log(err);

        res.sendStatus(500);
    }
});

export default ProductsRoute;