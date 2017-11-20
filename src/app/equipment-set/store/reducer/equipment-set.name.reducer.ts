import { EquipmentSetNameActions, EquipmentSetNameActionTypes, SetEquipmentSetNameAction } from './../actions/equipment-set-name.actions';
import { EquipmentSetActionTypes } from '../actions/equipment-set.actions';
import { EquipmentSetActions, SetEquipmentSetAction } from './../actions/equipment-set.actions';

export function equipmentSetNameReducer(state: string = '', action: EquipmentSetActions | EquipmentSetNameActions): string {
  switch (action.type) {
    case EquipmentSetNameActionTypes.SET:
      return (action as SetEquipmentSetNameAction).payload;
    case EquipmentSetActionTypes.SET:
      return (action as SetEquipmentSetAction).payload.name;
    default:
      return state;
  }
}
