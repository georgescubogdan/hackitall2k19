import { BaseItem } from './base-item';
import { Sizes } from './sizes.enum';

export interface Clothes extends BaseItem {
    sex: boolean;
    size: string; //    under2,    three_four,    five_six,    seven_eight,    XS,    S,  M,    L,    XL,    XXL
}
