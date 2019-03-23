import { BaseItem } from './base-item';
import { FoodType } from './food-type.enum';

export interface Food extends BaseItem{
    type: FoodType;
}
