import { EquipmentSetSettings } from '../../../shared/models/equipment-set-settings.model';
import {
  EquipmentSetSettingsActions,
  EquipmentSetSettingsActionTypes, EquipmentSetSettingsSetAction, EquipmentSetSettingsUpdateAction
} from '../actions/equipment-set-settings.actions';
import { EquipmentSetActionTypes, SetEquipmentSetAction } from '../actions/equipment-set.actions';

/* tslint:disable-next-line:no-empty-interface */
export interface EquipmentSetSettingsState extends EquipmentSetSettings {

}

const initialState: EquipmentSetSettingsState = { name: null };

export function equipmentSetSettingsReducer(
  state: EquipmentSetSettingsState = initialState,
  action: EquipmentSetSettingsActions): EquipmentSetSettingsState {
  switch (action.type) {
    case EquipmentSetSettingsActionTypes.SET:
      return { ...state, ...(action as EquipmentSetSettingsSetAction).payload };
    case EquipmentSetActionTypes.SET:
      return { ...state, ...(action as EquipmentSetSettingsUpdateAction).payload };
    default:
      return state;
  }
}
