import { EquipmentVariant } from './../../../shared/models/equipment-variant.model';
import { EquipmentCollection } from './../../../shared/models/equipment-collection.model';
import { Action } from '@ngrx/store';

export const EquipmentVariantActionTypes = {
  ADD: '[EquipmentVariant] Add',
  DELETE: '[EquipmentVariant] Delete',
  UPDATE: '[EquipmentVariant] Update',
  SELECT: '[EquipmentVariant] Select'
};

export class AddEquipmentVariantAction implements Action {
  public type = EquipmentVariantActionTypes.ADD;

  constructor(public payload: EquipmentVariant) {}
}

export class DeleteEquipmentVariantAction implements Action {
  public type = EquipmentVariantActionTypes.DELETE;

  constructor(public payload: EquipmentVariant) {}
}

export class UpdateEquipmentVariantAction implements Action {
  public type = EquipmentVariantActionTypes.UPDATE;

  constructor(public payload: EquipmentVariant) {}
}

export class SelectEquipmentVariantAction implements Action {
  public type = EquipmentVariantActionTypes.SELECT;

  constructor(public payload: EquipmentVariant) {}
}

export type EquipmentVariantActions =
  AddEquipmentVariantAction
  | DeleteEquipmentVariantAction
  | UpdateEquipmentVariantAction;
