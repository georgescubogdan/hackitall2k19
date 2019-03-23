export interface BaseItem {
    category: string; // food,  money,    clothes,    meds,    volunteering
    description: string;
    sex?: boolean; // clothes
    size?: string;  // under2,    three_four,    five_six,    seven_eight,    XS,    S,  M,    L,    XL,    XXL
    type?: string; // perisable, nonperisable
    name?: string; // medicines name
    sum?: number; // money
}
