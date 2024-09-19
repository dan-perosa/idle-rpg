import { Item } from "./item";

export interface CurrentActivity {
    index: string;
    name: string;
    secsToAc: number;
    startTime: number;
    item: Item
  }
  