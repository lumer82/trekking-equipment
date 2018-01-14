import { literal } from '../utils/action-helpers';
import { Action } from '@ngrx/store';
import { EquipmentLimits } from '../../../shared/models/equipment-limits.model';

const typeFn = literal('EquipmentCollectionLimits');

export const EquipmentCollectionLimitActionTypes = {
  SET: typeFn('Set')
};

export class SetEquipmentCollectionLimitAction implements Action {
  public readonly type = EquipmentCollectionLimitActionTypes.SET;

  constructor(public payload: { id: string, limits: EquipmentLimits}) {}
}

export type EquipmentCollectionLimitsActions = SetEquipmentCollectionLimitAction;

