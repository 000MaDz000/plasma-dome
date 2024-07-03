import { IStatistics, IStatisticsName } from "@/models/statistics";

export default function StatisticsDatasetMonthly(dataset: IStatistics[], datasetName: IStatisticsName) {
    const structure = [
        { name: datasetName, date: { month: 1, year: 99, day: 99 }, count: 0 },
        { name: datasetName, date: { month: 2, year: 99, day: 99 }, count: 0 },
        { name: datasetName, date: { month: 3, year: 99, day: 99 }, count: 0 },
        { name: datasetName, date: { month: 4, year: 99, day: 99 }, count: 0 },
        { name: datasetName, date: { month: 5, year: 99, day: 99 }, count: 0 },
        { name: datasetName, date: { month: 6, year: 99, day: 99 }, count: 0 },
        { name: datasetName, date: { month: 7, year: 99, day: 99 }, count: 0 },
        { name: datasetName, date: { month: 8, year: 99, day: 99 }, count: 0 },
        { name: datasetName, date: { month: 9, year: 99, day: 99 }, count: 0 },
        { name: datasetName, date: { month: 10, year: 99, day: 99 }, count: 0 },
        { name: datasetName, date: { month: 11, year: 99, day: 99 }, count: 0 },
        { name: datasetName, date: { month: 12, year: 99, day: 99 }, count: 0 },
    ];

    for (let statistic of dataset) structure[statistic.date.month - 1].count += statistic.count; // calculate all days dataset into one month

    return structure;
}