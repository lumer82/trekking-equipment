export class EquipmentVariant {
  id: string;
  name: string;
  selectedItems: {
    [entryId: string]: string
  };
}
