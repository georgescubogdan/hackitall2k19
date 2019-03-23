import { Items } from './items.enum';

export interface BaseItem {
    category: string; // food,  money,    clothes,    meds,    volunteering
    description: string;
}
