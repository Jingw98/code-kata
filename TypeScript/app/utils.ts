import { SpecialItemName } from "./consts";
import { Item } from "./item";

export const updateSingleItemQuality = (item: Item, updateNumber: number): Item => {
    if (item.name === SpecialItemName.Sulfuras) {
        // no changes
        return item
    }
    const newQuality = item.quality + updateNumber
    item.quality = newQuality > 50 ? 50
        : newQuality < 0 ? 0
            : newQuality

    return item
}