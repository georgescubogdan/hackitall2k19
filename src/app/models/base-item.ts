import { Items } from './items.enum';

export interface BaseItem {
    category: Items | string;
    description: string;
}
