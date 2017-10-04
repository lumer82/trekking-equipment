import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { Action } from '@ngrx/store';
import { EquipmentSetActionTypes } from '../actions/equipment-set.actions';
import {EquipmentItemActionTypes, EquipmentItemAddAction} from '../actions/equipment-item.actions';

export interface EquipmentItem {
  id: string;
  name: string;
  price: number;
  weight: number;
}

export type EquipmentItemsState = EntityState<EquipmentItem>;

const adapter: EntityAdapter<EquipmentItem> = createEntityAdapter<EquipmentItem>();

const initialState: EquipmentItemsState = adapter.getInitialState();

export function equipmentItemsReducer(state: EquipmentItemsState = initialState, action: Action): EquipmentItemsState {
  switch (action.type) {
    case EquipmentSetActionTypes.CREATE_NEW:
      return initialState;
    case EquipmentItemActionTypes.ADD:
      return adapter.addOne((<EquipmentItemAddAction>action).payload, state);
    default:
      return state;
  }
}
