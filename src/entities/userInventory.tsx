import { Item } from "./item";

export interface UserInventory {
    items: Item[];
    limit: number;
}
