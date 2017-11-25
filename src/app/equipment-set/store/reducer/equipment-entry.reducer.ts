import { EquipmentItem } from './../../../shared/models/equipment-item.model';
import { EquipmentItemActionTypes, AddEquipmentItemAction, EquipmentItemActions, DeleteEquipmentItemAction } from './../actions/equipment-item.actions';
import {
  EquipmentCollectionActionTypes,
  DeleteEquipmentCollectionAction,
  EquipmentCollectionActions
} from './../actions/equipment-collection.actions';
import { AddEquipmentEntryAction, DeleteEquipmentEntryAction, UpdateEquipmentEntryAction } from './../actions/equipment-entry.actions';
import { createEntityAdapter } from '@ngrx/entity/src/create_adapter';
import { EntityAdapter } from '@ngrx/entity/src/models';
import { EntityState } from '@ngrx/entity';
import { EquipmentEntry } from './../../../shared/models/equipment-entry.model';
import { EquipmentEntryActions, EquipmentEntryActionTypes } from '../actions/equipment-entry.actions';

export interface EquipmentEntryState extends EntityState<EquipmentEntry> {
}

type State = EquipmentEntryState;

const adapter: EntityAdapter<EquipmentEntry> = createEntityAdapter<EquipmentEntry>();

export function equipmentEntryReducer(
  state: State = adapter.getInitialState(),
  action: EquipmentEntryActions | EquipmentCollectionActions | EquipmentItemActions): State {
  switch (action.type) {
    case EquipmentEntryActionTypes.ADD: {
      const payload = (action as AddEquipmentEntryAction).payload;
      return adapter.addOne(payload, state);
    }
    case EquipmentEntryActionTypes.DELETE: {
      const payload = (action as DeleteEquipmentEntryAction).payload;
      return adapter.removeOne(payload.id, state);
    }
    case EquipmentEntryActionTypes.UPDATE: {
      const payload = (action as UpdateEquipmentEntryAction).payload;
      return adapter.updateOne({ id: payload.id, changes: payload}, state);
    }
    case EquipmentCollectionActionTypes.DELETE: {
      const collection = (action as DeleteEquipmentCollectionAction).payload;
      return adapter.removeMany(collection.entries, state);
    }
    case EquipmentItemActionTypes.ADD: {
      const item = (action as AddEquipmentItemAction).payload;
      const entry = addItemToEntry(
        state.entities[item.entryId],
        item
      );
      return adapter.updateOne(
        {
          id: entry.id,
          changes: entry
        },
        state
      );
    }
    case EquipmentItemActionTypes.DELETE: {
      const item = (action as DeleteEquipmentItemAction).payload;
      const entry = removeItemFromEntry(
        state.entities[item.entryId],
        item
      );
      return adapter.updateOne(
        {
          id: entry.id,
          changes: entry
        },
        state
      );
    }
    default:
      return state;
  }
}

function addItemToEntry(
  entry: EquipmentEntry,
  item: EquipmentItem
): EquipmentEntry {
  return { ...entry, items: [...(entry.items || []), item.id] };
}

function removeItemFromEntry(
  entry: EquipmentEntry,
  item: EquipmentItem
): EquipmentEntry {
  return {
    ...entry,
    items: (entry.items || []).filter(id => item.id !== id)
  };
}
