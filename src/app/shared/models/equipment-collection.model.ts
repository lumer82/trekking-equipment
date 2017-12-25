export interface EquipmentCollection {
  id: string;
  name: string;
  entries: Array<string>;
  limits?: { [key: string]: number };
}
