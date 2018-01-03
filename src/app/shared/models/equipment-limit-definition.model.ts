export enum IconType {
  MATERIAL = 1, // There is a problem with binding 0 to a radio group.
                // If 0 is the selected value, no radio button is selected. As a workaround the enums start at one
  FONTAWESOME
}

export enum LimitType {
  GLOBAL = 1,
  LOCAL
}

export interface EquipmentLimitDefinition {
  name: string;
  type: LimitType;
  displayName?: string;
  icon?: {
    name: string,
    type: IconType
  };
  mapperFn?: (val: string) => number;
}
