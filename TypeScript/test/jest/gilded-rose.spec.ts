import { GildedRose } from '@/gilded-rose';
import { Item } from '@/item';
import { SpecialItemName } from '@/consts';

describe('Conjured item', () => {
  it('should degrade in Quality twice as fast as normal items', () => {
    const conjuredItem = new GildedRose([new Item(SpecialItemName.Conjured, 5, 5)]);
    const itemInADay = conjuredItem.updateQuality();
    expect(itemInADay[0].quality).toBe(3);
  });
});

describe('general', () => {
  const generalItemName = '+5 Dexterity Vest'
  it('the quality of an item should never be negative', () => {
    const generalItem = new GildedRose([new Item(generalItemName, 1, 0)]);
    const items = generalItem.updateQuality();
    expect(items[0].quality).toBe(0);
  });

  it('the quality of an item should decrese', () => {
    const generalItem = new GildedRose([new Item(generalItemName, 1, 1)]);
    const items = generalItem.updateQuality();
    expect(items[0].quality).toBe(0);
  });
})
