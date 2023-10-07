import { NormalItemQualityChangePerDay, SpecialItemName } from "./consts";
import { Item } from "./item";
import { updateSingleItemQuality } from "./utils";

export class GildedRose {
  items: Array<Item>

  constructor(items = [] as Array<Item>) {
    this.items = items
  }

  updateSingleItem(item: Item): Item {
    if (item.name === SpecialItemName.Sulfuras) {
      //"Sulfuras" is a legendary item and as such its Quality is 80 and it never alters
      return item
    }

    const sellInPassed = item.sellIn <= 0
    item.sellIn--

    if (item.name === SpecialItemName.Conjured) {
      const conjuredDecresedNum = sellInPassed
        ? NormalItemQualityChangePerDay * 2 * 2
        : NormalItemQualityChangePerDay * 2

      updateSingleItemQuality(item, conjuredDecresedNum * -1)

      return item
    }

    if (item.name === SpecialItemName.AgedBrie) {
      const agedIncreasedNum = sellInPassed
        ? NormalItemQualityChangePerDay * 2
        : NormalItemQualityChangePerDay
      updateSingleItemQuality(item, agedIncreasedNum)
      return item
    }

    if (item.name === SpecialItemName.BackstagePasses) {
      if (sellInPassed) {
        item.quality = 0
      } else {
        const passesIncreasedNum = item.sellIn < 5 ? 3
          : item.sellIn < 10 ? 2
            : NormalItemQualityChangePerDay
        updateSingleItemQuality(item, passesIncreasedNum)
      }

      return item
    }

    updateSingleItemQuality(
      item,
      sellInPassed
        ? (NormalItemQualityChangePerDay * 2 * -1)
        : (NormalItemQualityChangePerDay * -1))

    return item

  }

  updateQuality() {
    return this.items.map((item) => {
      return this.updateSingleItem(item)
    })
  }
}
