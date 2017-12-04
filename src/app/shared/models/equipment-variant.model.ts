export interface EquipmentVariantTotals {
  price: number;
  weight: number;
  volume: number;
}

export interface EquipmentVariantEntry {
  entryId: string;
  itemId?: string;
  totals?: EquipmentVariantTotals;
}

export class EquipmentVariant {
  id: string;
  name: string;
  collectionId: string;
  totals?: EquipmentVariantTotals;
  entries: Array<EquipmentVariantEntry>;
}
