export class EquipmentCollectionVariant {
  id: string;
  name: string;
  default: boolean;
  selectedItems: {
    [entryId: string]: string
  };
}
