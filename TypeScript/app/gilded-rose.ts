import { NormalItemQualityChangePerDay, SpecialItemName } from "./consts";
import { Item } from "./item";

export class GildedRose {
  items: Array<Item>;

  constructor(items = [] as Array<Item>) {
    this.items = items;
  }

  updateQuality() {
    for (let i = 0; i < this.items.length; i++) {
      if (this.items[i].name !== SpecialItemName.AgedBrie && this.items[i].name !== SpecialItemName.BackstagePasses) {
        if (this.items[i].quality > 0) {
          if (this.items[i].name === SpecialItemName.Conjured) {
            const newQuality = this.items[i].quality - (NormalItemQualityChangePerDay * 2)
            this.items[i].quality = newQuality < 0 ? 0 : newQuality
          } else if (this.items[i].name !== SpecialItemName.Sulfuras) {

            this.items[i].quality = this.items[i].quality - NormalItemQualityChangePerDay
          }
        }
      } else {
        if (this.items[i].quality < 50) {
          this.items[i].quality = this.items[i].quality + NormalItemQualityChangePerDay
          if (this.items[i].name === SpecialItemName.BackstagePasses) {
            if (this.items[i].sellIn < 11) {
              if (this.items[i].quality < 50) {
                this.items[i].quality = this.items[i].quality + NormalItemQualityChangePerDay
              }
            }
            if (this.items[i].sellIn < 6) {
              if (this.items[i].quality < 50) {
                this.items[i].quality = this.items[i].quality + NormalItemQualityChangePerDay
              }
            }
          }
        }
      }
      if (this.items[i].name !== SpecialItemName.Sulfuras) {
        this.items[i].sellIn = this.items[i].sellIn - NormalItemQualityChangePerDay
      }
      if (this.items[i].sellIn < 0) {
        if (this.items[i].name !== SpecialItemName.AgedBrie) {
          if (this.items[i].name !== SpecialItemName.BackstagePasses) {
            if (this.items[i].quality > 0) {
              if (this.items[i].name !== SpecialItemName.Sulfuras) {
                this.items[i].quality = this.items[i].quality - NormalItemQualityChangePerDay
              }
            }
          } else {
            this.items[i].quality = this.items[i].quality - this.items[i].quality
          }
        } else {
          if (this.items[i].quality < 50) {
            this.items[i].quality = this.items[i].quality + NormalItemQualityChangePerDay
          }
        }
      }
    }

    return this.items;
  }
}
