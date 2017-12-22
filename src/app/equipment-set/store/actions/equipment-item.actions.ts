import { EquipmentItem } from './../../../shared/models/equipment-item.model';
import { Action } from '@ngrx/store';

export const EquipmentItemActionTypes = {
  ADD: '[EquipmentItem] Add',
  DELETE: '[EquipmentItem] Delete',
  UPDATE: '[EquipmentItem] Update',
  SELECT: '[EquipmentItem] Select'
};

export class AddEquipmentItemAction implements Action {
  public type = EquipmentItemActionTypes.ADD;

  constructor(public payload: EquipmentItem) {}
}

export class DeleteEquipmentItemAction implements Action {
  public type = EquipmentItemActionTypes.DELETE;

  constructor(public payload: EquipmentItem) {}
}

export class UpdateEquipmentItemAction implements Action {
  public type = EquipmentItemActionTypes.UPDATE;

  constructor(public payload: EquipmentItem) {}
}

export class SelectEquipmentItemAction implements Action {
  public type = EquipmentItemActionTypes.SELECT;

  constructor(public payload: EquipmentItem) {}
}

export type EquipmentItemActions =
  AddEquipmentItemAction
  | DeleteEquipmentItemAction
  | UpdateEquipmentItemAction
  | SelectEquipmentItemAction;
