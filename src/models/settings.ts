import { Model, model, Schema } from "mongoose";

export type ISettingName = "recommendations" | "categories";

export interface ISetting {
    name: ISettingName;
    value: string[];
}

const SettingsSchema = new Schema({
    name: String,
    value: [String],
});


SettingsSchema.index({ name: 1 });

const Settings = model("Settings", SettingsSchema) as Model<ISetting>;

global.models.Settings = Settings;

export default Settings;