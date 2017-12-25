export enum IconType {
  MATERIAL,
  FONTAWESOME
}

export interface EquipmentLimit {
  name: string;
  displayName?: string;
  icon?: {
    name: string,
    type: IconType
  };
  mapperFn?: (val: string) => number;
}
