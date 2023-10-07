import { GildedRose } from '@/gilded-rose';
import { Item } from '@/item';
import { SpecialItemName } from '@/consts';

describe('Conjured item', () => {
  it('should degrade in Quality twice as fast as normal items', () => {
    const conjuredItem = new GildedRose([new Item(SpecialItemName.Conjured, 5, 5)]);
    const itemInADay = conjuredItem.updateQuality();
    expect(itemInADay[0].quality).toBe(3);
  });

  it('should degrade in Quality twice as fast as normal items after sell by date has passed', () => {
    const conjuredItem = new GildedRose([new Item(SpecialItemName.Conjured, 0, 5)]);
    const itemInADay = conjuredItem.updateQuality();
    expect(itemInADay[0].quality).toBe(1);
  });
});

describe('general', () => {
  const generalItemName = '+5 Dexterity Vest'

  it('the sellin of an item should decreade everyday', () => {
    const generalItem = new GildedRose([new Item(generalItemName, 1, 0)]);
    const items = generalItem.updateQuality();
    expect(items[0].sellIn).toBe(0);
  });

  it('the quality of an item should never be negative', () => {
    const generalItem = new GildedRose([new Item(generalItemName, 1, 0)]);
    const items = generalItem.updateQuality();
    expect(items[0].quality).toBe(0);
  });

  it('the quality of an item should decrese everyday', () => {
    const generalItem = new GildedRose([new Item(generalItemName, 1, 1)]);
    const items = generalItem.updateQuality();
    expect(items[0].quality).toBe(0);
  });

  it('Once the sell by date has passed, Quality should degrades twice as fast', () => {
    const generalItem = new GildedRose([new Item(generalItemName, 0, 3)]);
    const items = generalItem.updateQuality();
    expect(items[0].quality).toBe(1);
  });

  it('the quality of an item should never be above 50', () => {
    const agedItem = new GildedRose([new Item(SpecialItemName.AgedBrie, 1, 50)]);
    const items = agedItem.updateQuality();
    expect(items[0].quality).toBe(50);
  });
})

describe('Aged item', () => {
  it('the quality of an aged item should increase everyday', () => {
    const agedItem = new GildedRose([new Item(SpecialItemName.AgedBrie, 1, 20)]);
    const items = agedItem.updateQuality();
    expect(items[0].quality).toBe(21);
  });
})

describe('Sulfuras item', () => {
  it('sulfuras item should have quality as 80', () => {
    const sulfurasItem = new GildedRose([new Item(SpecialItemName.Sulfuras, 1, 80)]);
    const items = sulfurasItem.updateQuality();
    expect(items[0].quality).toBe(80);
  });
})

describe('Backstage passes item', () => {
  it('Backstage passes should increase by 2 when there are 10 days or less', () => {
    const backstagePassesItem = new GildedRose([new Item(SpecialItemName.BackstagePasses, 8, 8)]);
    const items = backstagePassesItem.updateQuality();
    expect(items[0].quality).toBe(10);
  });

  it('Backstage passes should increase by 3 when there are 5 days or less', () => {
    const backstagePassesItem = new GildedRose([new Item(SpecialItemName.BackstagePasses, 3, 8)]);
    const items = backstagePassesItem.updateQuality();
    expect(items[0].quality).toBe(11);
  });

  it('Backstage passes quality should drops to 0 after the concert', () => {
    const backstagePassesItem = new GildedRose([new Item(SpecialItemName.BackstagePasses, 0, 8)]);
    const items = backstagePassesItem.updateQuality();
    expect(items[0].quality).toBe(0);
  });
})
