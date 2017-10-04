import { Action } from '@ngrx/store';
import { EquipmentCollection } from '../reducer/equipment-collection.reducer';

export const EquipmentCollectionActionTypes = {
  ADD: '[EquipmentCollection] Add'
};

export class EquipmentCollectionAddAction implements Action {
  readonly type: string = EquipmentCollectionActionTypes.ADD;

  constructor(readonly payload: EquipmentCollection) {}
}

export type EquipmentCollectionActions =
  EquipmentCollectionAddAction;
