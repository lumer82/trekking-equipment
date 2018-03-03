import { EquipmentSet } from '../../../../shared/models/equipment-set.model';
import { Action } from '@ngrx/store';
import { literal } from '../utils/action-helpers';

const typeFn = literal('EquipmentSet');

export const EquipmentSetActionTypes = {
  SET: typeFn('Set'),
  UPDATE_TOTALS: typeFn('Update totals')
}

export class SetEquipmentSetAction implements Action {
  public type = EquipmentSetActionTypes.SET;

  constructor(public payload: EquipmentSet) {}
}

export class UpdateTotalsEquipmentSetAction implements Action {
  public readonly type = EquipmentSetActionTypes.UPDATE_TOTALS;
}

export type EquipmentSetActions =
  SetEquipmentSetAction;
