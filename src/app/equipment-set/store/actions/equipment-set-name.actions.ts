
import { Action } from "@ngrx/store";

export const EquipmentSetNameActionTypes = {
  SET: '[EquipmentSetName] Set'
}

export class SetEquipmentSetNameAction implements Action {
  public type = EquipmentSetNameActionTypes.SET;

  constructor(public payload: string) {};
}

export type EquipmentSetNameActions =
  SetEquipmentSetNameAction;
