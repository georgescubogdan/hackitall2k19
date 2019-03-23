import { BaseItem } from './base-item';

export interface DonationRequest {
    email: string;
    items: BaseItem[];
}
