import { mkdirSync } from "fs";
import { join } from "path";
export const imagesPath = join(__dirname, "../../../images");
try {
    mkdirSync(imagesPath);
}
catch (err) { }