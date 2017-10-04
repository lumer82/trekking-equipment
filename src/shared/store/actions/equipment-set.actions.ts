import { Action } from '@ngrx/store';

export const EquipmentSetActionTypes = {
  CREATE_NEW: '[EquipmentSet] Create new'
};

export class EquipmentSetCreateNewAction implements Action {
  readonly type: string = EquipmentSetActionTypes.CREATE_NEW;
}

export type EquipmentSetActions =
  EquipmentSetCreateNewAction;
