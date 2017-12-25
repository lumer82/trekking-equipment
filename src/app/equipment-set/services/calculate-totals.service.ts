import { Injectable } from '@angular/core';
import { EquipmentLimitDefinition } from '../../shared/models/equipment-limit-definition.model';
import { EquipmentVariantEntry, EquipmentVariantTotals } from '../../shared/models/equipment-variant.model';
import { EquipmentItem } from '../../shared/models/equipment-item.model';

@Injectable()
export class CalculateTotalsService {

  calculateTotal(field: (obj: EquipmentVariantTotals | EquipmentItem) => number,
                 index: number,
                 acc: Array<EquipmentVariantEntry>,
                 cur: EquipmentVariantEntry,
                 items: { [itemId: string]: EquipmentItem }): number {
    return +(field(items[cur.itemId].values) || 0) + (index > 0 ? field(acc[index - 1].totals) : 0);
  }

  calculateTotals(variantEntries: Array<EquipmentVariantEntry>, items: { [itemId: string]: EquipmentItem }, limits: Array<EquipmentLimitDefinition>): Array<EquipmentVariantEntry> {
    return variantEntries.reduce((entries, entry, index) => {
      const totals = limits.reduce((total, limit) => {
        total[limit.name] = this.calculateTotal((obj: EquipmentItem) => obj[limit.name], index, entries, entry, items);
        return total;
      }, {});
      entries.push({...entry, totals});
      return entries;
    }, [] as Array<EquipmentVariantEntry>);
  }
}
