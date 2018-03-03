import { Injectable } from '@angular/core';
import { EquipmentLimitDefinition, LimitType } from '../../shared/models/equipment-limit-definition.model';
import { EquipmentVariantEntry, EquipmentVariantTotals } from '../../shared/models/equipment-variant.model';
import { EquipmentItem } from '../../shared/models/equipment-item.model';
import { EquipmentTotals } from '../../shared/models/equipment-totals.model';

@Injectable()
export class CalculateTotalsService {

  calculateTotal(field: (obj: EquipmentVariantTotals | EquipmentItem) => number,
                 index: number,
                 acc: Array<EquipmentVariantEntry>,
                 cur: EquipmentVariantEntry,
                 items: { [itemId: string]: EquipmentItem }): number {
    return +(field(items[cur.itemId].values) || 0) + (index > 0 ? field(acc[index - 1].totals) : 0);
  }

  calculateTotalsForEntries(variantEntries: Array<EquipmentVariantEntry>, items: { [itemId: string]: EquipmentItem }, limits: Array<EquipmentLimitDefinition>): Array<EquipmentVariantEntry> {
    return variantEntries.reduce((entries, entry, index) => {
      const totals = limits.reduce((total, limit) => {
        total[limit.name] = this.calculateTotal((obj: EquipmentItem) => obj[limit.name], index, entries, entry, items);
        return total;
      }, {});
      entries.push({...entry, totals});
      return entries;
    }, [] as Array<EquipmentVariantEntry>);
  }

  private createDefaultTotals(limits: Array<EquipmentLimitDefinition>): EquipmentTotals {
    return limits.reduce((totals, limit) => {
      totals[limit.name] = 0;
      return totals;
    }, {});
  }

  calculateTotalsForCollections(order: Array<string>,
                                collectionTotals: { [id: string]: EquipmentTotals },
                                limits: Array<EquipmentLimitDefinition>): { [collectionId: string]: EquipmentTotals } {
    return order.reduce((totals, id, index, ids) => {
      const collectionTotalsForId = collectionTotals[id] || {};
      const previous = index > 0 ? totals[ids[index - 1]] : this.createDefaultTotals(limits);
      totals[id]  = limits.reduce((t, limit) => {
        t[limit.name] = this.getStartValue(previous, limit) + (collectionTotalsForId[limit.name] || 0);
        return t;
      }, {});
      return totals;
    }, {});
  }

  private getStartValue(previous: EquipmentTotals, limit: EquipmentLimitDefinition): number {
    return limit.type === LimitType.GLOBAL ? previous[limit.name] : 0;
  }
}
