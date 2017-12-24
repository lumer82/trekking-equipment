import { Action } from '@ngrx/store';
import { EquipmentSetSettings } from '../../../shared/models/equipment-set-settings.model';

const literal = (value: string) => `[EquipmentSetSettings] ${value}`;

export const EquipmentSetSettingsActionTypes = {
  SET: literal('Set'),
  UPDATE: literal('Update')
};

export class EquipmentSetSettingsSetAction implements Action {
  public type = EquipmentSetSettingsActionTypes.SET;

  constructor(public payload: EquipmentSetSettings) {}
}

export class EquipmentSetSettingsUpdateAction implements Action {
  public type = EquipmentSetSettingsActionTypes.UPDATE;

  constructor(public payload: Partial<EquipmentSetSettings>) {}
}



export type EquipmentSetSettingsActions =
  EquipmentSetSettingsSetAction
  | EquipmentSetSettingsUpdateAction;
