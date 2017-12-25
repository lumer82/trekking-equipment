import { Action } from '@ngrx/store';
import { EquipmentCollection } from '../../../shared/models/equipment-collection.model';

export const EquipmentCollectionActionTypes = {
  ADD: '[EquipmentCollection] Add',
  DELETE: '[EquipmentCollection] Delete',
  UPDATE: '[EquipmentCollection] Update'
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

export type EquipmentCollectionActions =
  AddEquipmentCollectionAction
  | DeleteEquipmentCollectionAction
  | UpdateEquipmentCollectionAction;
