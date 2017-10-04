import { equipmentCollectionsReducer, EquipmentCollectionsState } from './equipment-collection.reducer';
import { Action } from '@ngrx/store';
import { EquipmentSetActionTypes } from '../actions/equipment-set.actions';

export interface EquipmentSetState {
  _id?: string;
  name: string;
  collections: EquipmentCollectionsState;
}

const initialState: EquipmentSetState = {
  name: '',
  collections: undefined
}

export function equipmentSetReducer(state: EquipmentSetState = initialState, action: Action): EquipmentSetState {
  const collections = equipmentCollectionsReducer(state.collections, action);
  if (collections !== state.collections) {
    state = {...state, collections};
  }

  switch (action.type) {
    case EquipmentSetActionTypes.CREATE_NEW:
      return {...initialState};
    default:
      return state;
  }

}
