interface Totals {
  price: number;
  weight: number;
  volume: number;
}

export class EquipmentVariant {
  id: string;
  name: string;
  collectionId: string;
  totals?: Totals;
  entries: Array<{
    entryId: string;
    itemId?: string;
    totals?: Totals;
  }>;
}
