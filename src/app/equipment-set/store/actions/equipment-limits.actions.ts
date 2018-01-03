import { literal } from '../utils/action-helpers';
import { Action } from '@ngrx/store';
import { EquipmentLimitDefinition } from '../../../shared/models/equipment-limit-definition.model';
import { Update, UpdateStr } from '@ngrx/entity/src/models';

const typeFn = literal('EquipmentLimits');

export const EquipmentLimitsActionTypes = {
  ADD: typeFn('Add'),
  UPDATE: typeFn('Update'),
  UPDATE_MANY: typeFn('Update Many'),
  DELETE: typeFn('Delete')
}

export class AddEquipmentLimitsAction implements Action {
  readonly type = EquipmentLimitsActionTypes.ADD;

  constructor(public payload: EquipmentLimitDefinition) {}
}

export class UpdateEquipmentLimitsAction implements Action {
  readonly type = EquipmentLimitsActionTypes.UPDATE;

  constructor(public payload: { id: string, changes: Partial<EquipmentLimitDefinition>}) {}
}

export class UpdateManyEquipmentLimitsAction implements Action {
  readonly type = EquipmentLimitsActionTypes.UPDATE_MANY;

  constructor(public payload: Array<{ id: string, changes: EquipmentLimitDefinition}>) {}
}

export class DeleteEquipmentLimitsAction implements Action {
  readonly type = EquipmentLimitsActionTypes.DELETE;

  constructor(public payload: string) {}
}

export type EquipmentLimitsActions =
  AddEquipmentLimitsAction
  | UpdateEquipmentLimitsAction
  | UpdateManyEquipmentLimitsAction
  | DeleteEquipmentLimitsAction;
