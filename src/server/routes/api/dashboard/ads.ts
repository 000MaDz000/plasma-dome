import { IAdvertisment, IPopulatedAdvertisments } from "@/models/advertisment";
import { imagesPath } from "../../../functions/static";
import { Request, Router } from "express";
import multer, { Options } from "multer";
import { unlink } from "fs/promises";
import { Advertisment, Image } from "../../../../models";
import { join } from "path";

const AdsRoute = Router();

type NewAddQuery = Partial<Omit<Omit<IAdvertisment, "images">, "createdAt">>;

const AllowedImages = {
    "image/png": true,
    "image/jpeg": true,
    "image/jpg": true,
}

const options: Options = {
    "dest": imagesPath,
    fileFilter(req, file, callback) {
        if (!req.session.authorized || req.session.user?.role !== "admin") return callback(null, false);
        if (!(file.mimetype in AllowedImages)) return callback(null, false);

        callback(null, true);
    }

}
AdsRoute.post("/", multer(options).single("images"), async (req: Request<{}, {}, NewAddQuery, NewAddQuery>, res) => {
    try {
        // file checking
        const file = req.file;

        if (!file) {
            res.sendStatus(400);
            return;
        };

        const filePath = file.path;
        const filename = file.filename;

        // if the data is invalid, delete the image
        if (!req.body.barName || !req.body.link) {
            await unlink(filePath);
            res.sendStatus(400);
            return;
        };

        const img = new Image({
            relativePath: filename,
            relativeUrl: filename + "." + file.mimetype.split("/")[1], // adding the extension
        });

        await img.save();

        const ad = new Advertisment({
            barName: req.body.barName,
            link: req.body.link,
            images: [img._id],
        });

        await ad.save();

        res.sendStatus(201);
    }
    catch (err) {
        res.sendStatus(500);
    }
});

AdsRoute.get("/", async (req: Request<{}, {}, {}, { active: string | boolean | undefined }>, res) => {
    try {
        const dbQuery: any = {};

        if (req.query.active === "true") dbQuery.active = true;
        else if (req.query.active === "false") dbQuery.active = false;

        const resData: IPopulatedAdvertisments[] = await Advertisment.find(dbQuery).populate("images");

        // return only images urls in the images field
        res.json(
            resData.map((val) => ({
                ...(val as any).toObject(),
                images: val.images.map(img => img.relativeUrl)
            }))
        );
    }
    catch (err) {
        res.json([]);
    }
});

AdsRoute.put("/:adId/:status", async (req: Request<{ adId: string, status: string }>, res) => {
    try {
        if (req.params.status !== "true" && req.params.status !== "false") return res.sendStatus(400);
        if (req.params.adId.length !== 24) return res.sendStatus(404);

        const active = req.params.status == "true" ? true : false;

        const r = await Advertisment.updateOne({
            _id: req.params.adId
        }, { $set: { active } });


        if (r.modifiedCount) {
            res.sendStatus(200);
        }
        else {
            res.sendStatus(404);
        }
    }
    catch (err) {
        res.sendStatus(500);
    }
});

AdsRoute.delete("/:adId", async (req, res) => {
    try {

        if (req.params.adId.length !== 24) return res.sendStatus(404);
        const r: IPopulatedAdvertisments | null = await Advertisment.findOneAndDelete({ _id: req.params.adId }).populate("images");

        // if there is no ad
        if (!r) return res.sendStatus(404);

        // delete the advertisment images first
        const deleted = [];

        for (let img of r.images) {
            const fullPath = join(imagesPath, img.relativePath);
            try {
                await unlink(fullPath);
                deleted.push((img as any)._id);
            } catch (err) { }
        }

        await Image.deleteMany({ _id: { $in: deleted } });

        res.sendStatus(200);
    }
    catch (err) {
        res.sendStatus(500);
    }
})
export default AdsRoute;