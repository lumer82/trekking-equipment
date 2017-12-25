export enum IconType {
  MATERIAL,
  FONTAWESOME
}

export interface EquipmentLimit {
  name: string;
  icon?: {
    name: string,
    type: IconType
  };
  mapperFn?: (val: string) => number;
}
