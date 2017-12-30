import { EquipmentVariant, EquipmentVariantEntry } from './../../../shared/models/equipment-variant.model';
import { EquipmentCollection } from './../../../shared/models/equipment-collection.model';
import { Action } from '@ngrx/store';

export const EquipmentVariantActionTypes = {
  ADD: '[EquipmentVariant] Add',
  DELETE: '[EquipmentVariant] Delete',
  UPDATE: '[EquipmentVariant] Update',
  SELECT: '[EquipmentVariant] Select',
  MOVE_ENTRY: '[EquipmentVariant] Move Entry',
  RECALCULATE_TOTALS: '[EquipmentVariant] Recalculate EquipmentVariantTotals',
  UPDATE_TOTALS: '[EquipmentVariant] Update EquipmentVariantTotals'
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

  constructor(public payload: { variant: EquipmentVariant, collectionId: string }) {}
}

export class MoveEntryEquipmentVariantAction implements Action {
  public type = EquipmentVariantActionTypes.MOVE_ENTRY;

  constructor(public payload: { collectionId: string, entryId: string, moveTo: number}) {}
}

export class RecalculateTotalsEquipmentVariantAction implements Action {
  public type = EquipmentVariantActionTypes.RECALCULATE_TOTALS;

  /**
   * @param {string} payload CollectionId
   */
  constructor(public payload: string) {}
}

export class UpdateTotalsEquipmentVariantAction implements Action {
  public type = EquipmentVariantActionTypes.UPDATE_TOTALS;
  constructor(public payload: { variantId: string, entries: Array<EquipmentVariantEntry>, totals: { [limit: string]: number } }) {}
}

export type EquipmentVariantActions =
  AddEquipmentVariantAction
  | DeleteEquipmentVariantAction
  | UpdateEquipmentVariantAction
  | SelectEquipmentVariantAction
  | MoveEntryEquipmentVariantAction
  | UpdateTotalsEquipmentVariantAction;
