import { Action } from '@ngrx/store';
import { EquipmentCollection } from '../../../shared/models/equipment-collection.model';
import { EquipmentTotals } from '../../../shared/models/equipment-totals.model';

const literal = (value: string) => `[EquipmentCollection] ${value}`;

export const EquipmentCollectionActionTypes = {
  ADD: literal('Add'),
  DELETE: literal('Delete'),
  UPDATE: literal('Update'),
  UPDATE_TOTALS: literal('UPDATE_TOTALS')
};

export class AddEquipmentCollectionAction implements Action {
  public type = EquipmentCollectionActionTypes.ADD;

  constructor(public payload: EquipmentCollection) {}
}

export class DeleteEquipmentCollectionAction implements Action {
  public type = EquipmentCollectionActionTypes.DELETE;

  constructor(public payload: EquipmentCollection) {}
}

export class UpdateEquipmentCollectionAction implements Action {
  public type = EquipmentCollectionActionTypes.UPDATE;

  constructor(public payload: { id: string, changes: Partial<EquipmentCollection> }) {}
}

export class UpdateTotalsEquipmentCollectionAction implements Action {
  public type = EquipmentCollectionActionTypes.UPDATE_TOTALS;

  constructor(public payload: { [collectionId: string]: EquipmentTotals }) {}
}

export type EquipmentCollectionActions =
  AddEquipmentCollectionAction
  | DeleteEquipmentCollectionAction
  | UpdateEquipmentCollectionAction
  | UpdateTotalsEquipmentCollectionAction;
