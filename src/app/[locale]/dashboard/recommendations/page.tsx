import { Settings } from "@/app/_classes/models";
import DashboardCategoriesPapers from "@/app/_components/dashboard-categories-papers";
import { ISettingName } from "@/models/settings";

export default async function Recommendations() {
    const recommeded: ISettingName = "recommendations";
    const categories: ISettingName = "categories";

    const recommendations = await Settings.findOne({ name: recommeded }) || { name: recommeded, value: [] };
    const SystemCategories = await Settings.findOne({ name: categories }) || { name: categories, value: [] };

    return (
        <div className="flex flex-col gap-7">
            <DashboardCategoriesPapers recommendations={{ name: recommendations.name, value: recommendations.value }} systemCategories={{ name: SystemCategories.name, value: SystemCategories.value }} />
        </div>
    )
}