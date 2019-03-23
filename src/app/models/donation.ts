import { BaseItem } from './base-item';

export interface Donation {
    date: Date | number;
    sender?: string;
    destination?: string;
    items: BaseItem[];
}
