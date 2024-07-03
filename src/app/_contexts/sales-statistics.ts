import { IStatistics } from "@/models/statistics";
import { createContext } from "react";

const SalesStatistics = createContext<IStatistics[]>([]);

export default SalesStatistics;