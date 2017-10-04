import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { Action } from '@ngrx/store';
import { EquipmentSetActions, EquipmentSetActionTypes } from '../actions/equipment-set.actions';
import { equipmentEntriesReducer, EquipmentEntriesState } from './equipment-entries.reducer';
import {
  EquipmentCollectionActions, EquipmentCollectionActionTypes,
  EquipmentCollectionAddAction
} from '../actions/equipment-collection.actions';
import { AddAction } from '../util/add-action';

export interface EquipmentCollection {
  id: string;
  name: string;
  entries: EquipmentEntriesState;
}

export type EquipmentCollectionsState = EntityState<EquipmentCollection>;

const adapter: EntityAdapter<EquipmentCollection> = createEntityAdapter<EquipmentCollection>();

const initialState: EquipmentCollectionsState = adapter.getInitialState();

export function equipmentCollectionsReducer(state: EquipmentCollectionsState = initialState,
                                            action: EquipmentSetActions | EquipmentCollectionActions): EquipmentCollectionsState {

  const addAction = (<AddAction>action).addAction;
  Object.values(state.entities)
    .filter(e => !addAction || (<AddAction>action).collection.id === e.id)
    .forEach(e => {
      const entries = equipmentEntriesReducer(e.entries, action);
      if (entries !== e.entries) {
        state = adapter.updateOne({id: e.id, changes: {...e, entries}}, state);
      }
    });

  switch (action.type) {
    case EquipmentSetActionTypes.CREATE_NEW:
      return initialState;
    case EquipmentCollectionActionTypes.ADD:
      return adapter.addOne((<EquipmentCollectionAddAction> action).payload, state);
    default:
      return state;
  }
}
