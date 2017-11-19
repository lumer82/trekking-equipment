import { EquipmentSetActionTypes } from '../actions/equipment-set.actions';
import { EquipmentSetActions } from './../actions/equipment-set.actions';

export function equipmentSetNameReducer(state: string = '', action: EquipmentSetActions): string {
  switch(action.type) {
    case EquipmentSetActionTypes.SET:
      return action.payload.name;
    default:
      return state;
  }
}
