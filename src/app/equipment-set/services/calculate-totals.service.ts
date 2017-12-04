import { Injectable } from '@angular/core';
import { EquipmentVariantEntry, EquipmentVariantTotals } from '../../shared/models/equipment-variant.model';
import { EquipmentItem } from '../../shared/models/equipment-item.model';

@Injectable()
export class CalculateTotalsService {
  readonly defaultTotals: EquipmentVariantTotals = {
    price: 0,
    weight: 0,
    volume: 0
  };

  calculateTotal(field: (obj: EquipmentVariantTotals | EquipmentItem) => number,
                 index: number,
                 acc: Array<EquipmentVariantEntry>,
                 cur: EquipmentVariantEntry,
                 items: { [itemId: string]: EquipmentItem }): number {
    return (field(items[cur.itemId] || this.defaultTotals) || 0) + (index > 0 ? field(acc[index - 1].totals) : 0);
  }

  calculateTotals(variantEntries: Array<EquipmentVariantEntry>, items: { [itemId: string]: EquipmentItem }): Array<EquipmentVariantEntry> {
    return variantEntries.reduce((acc, cur, index) => {
      acc.push({
        ...cur, totals: {
          price: this.calculateTotal(obj => obj.price, index, acc, cur, items),
          weight: this.calculateTotal(obj => obj.weight, index, acc, cur, items),
          volume: this.calculateTotal(obj => obj.volume as number, index, acc, cur, items)
        }
      });
      return acc;
    }, [] as Array<EquipmentVariantEntry>);
  }
}
