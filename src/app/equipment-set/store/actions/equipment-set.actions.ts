import { EquipmentSet } from '../../../../shared/models/equipment-set.model';
import { Action } from '@ngrx/store';

export const EquipmentSetActionTypes = {
  SET: '[EquipmentSet] Set'
}

export class SetEquipmentSetAction implements Action {
  public type = EquipmentSetActionTypes.SET;

  constructor(public payload: EquipmentSet) {}
}

export type EquipmentSetActions =
  SetEquipmentSetAction;
