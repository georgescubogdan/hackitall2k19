import { BaseItem } from './base-item';
import { Sizes } from './sizes.enum';

export interface Clothes extends BaseItem {
    sex: boolean;
    size: Sizes;
}
