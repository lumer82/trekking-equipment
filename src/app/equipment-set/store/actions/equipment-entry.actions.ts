import { EquipmentEntry } from './../../../shared/models/equipment-entry.model';
import { EquipmentCollection } from './../../../shared/models/equipment-collection.model';
import { Action } from '@ngrx/store';

export const EquipmentEntryActionTypes = {
  ADD: '[EquipmentEntry] Add',
  DELETE: '[EquipmentEntry] Delete',
  UPDATE: '[EquipmentEntry] Update'
};

export class AddEquipmentEntryAction implements Action {
  public type = EquipmentEntryActionTypes.ADD;

  constructor(public payload: {collection: EquipmentCollection, entry: EquipmentEntry}) {}
}

export class DeleteEquipmentEntryAction implements Action {
  public type = EquipmentEntryActionTypes.DELETE;

  constructor(public payload: {collection: EquipmentCollection, entry: string}) {}
}

export class UpdateEquipmentEntryAction implements Action {
  public type = EquipmentEntryActionTypes.UPDATE;

  constructor(public payload: {collection: EquipmentCollection, entry: EquipmentEntry}) {}
}

export type EquipmentEntryActions =
  AddEquipmentEntryAction
  | DeleteEquipmentEntryAction
  | UpdateEquipmentEntryAction;
