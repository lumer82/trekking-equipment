import {createEntityAdapter, EntityAdapter, EntityState} from '@ngrx/entity';
import {Action} from '@ngrx/store';
import {EquipmentSetActionTypes} from '../actions/equipment-set.actions';
import {equipmentItemsReducer, EquipmentItemsState} from './equipment-item.reducer';
import {AddAction} from '../util/add-action';
import {EquipmentEntryActionTypes, EquipmentEntryAddAction} from '../actions/equipment-entry.actions';

export interface EquipmentEntry {
  id: string;
  name: string;
  items: EquipmentItemsState;
}

export interface EquipmentEntriesState extends EntityState<EquipmentEntry> {
  selectedItemId: string | null;
}

const adapter: EntityAdapter<EquipmentEntry> = createEntityAdapter<EquipmentEntry>();

const initialState: EquipmentEntriesState = adapter.getInitialState({selectedItemId: undefined});

export function equipmentEntriesReducer(state: EquipmentEntriesState = initialState, action: Action): EquipmentEntriesState {
  const addAction = (<AddAction>action).addAction;
  Object.values(state.entities)
    .filter(e => !addAction || (<AddAction>action).entry.id === e.id)
    .forEach(e => {
      const items = equipmentItemsReducer(e.items, action);
      if (items !== e.items) {
        state = adapter.updateOne({id: e.id, changes: {...e, items}}, state);
      }
    });

  switch (action.type) {
    case EquipmentSetActionTypes.CREATE_NEW:
      return initialState;
    case EquipmentEntryActionTypes.ADD:
      return adapter.addOne((<EquipmentEntryAddAction>action).payload, state);
    default:
      return state;
  }
}
