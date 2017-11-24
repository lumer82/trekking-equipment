import { EquipmentCollection } from './../../../shared/models/equipment-collection.model';
import { EquipmentEntry } from './../../../shared/models/equipment-entry.model';
import {
  EquipmentEntryActions,
  EquipmentEntryActionTypes,
  DeleteEquipmentEntryAction,
  AddEquipmentEntryAction
} from './../actions/equipment-entry.actions';
import { EquipmentCollectionActionTypes } from './../actions/equipment-collection.actions';
import { EntityState } from '@ngrx/entity';
import { EntityAdapter } from '@ngrx/entity/src/models';
import { createEntityAdapter } from '@ngrx/entity/src/create_adapter';
import { EquipmentCollectionActions } from '../actions/equipment-collection.actions';

export interface EquipmentCollectionState
  extends EntityState<EquipmentCollection> {}

type State = EquipmentCollectionState;

const adapter: EntityAdapter<EquipmentCollection> = createEntityAdapter<
  EquipmentCollection
>();

export function equipmentCollectionReducer(
  state: State = adapter.getInitialState(),
  action: EquipmentCollectionActions | EquipmentEntryActions
): State {
  switch (action.type) {
    case EquipmentCollectionActionTypes.ADD:
      return adapter.addOne(
        (action as EquipmentCollectionActions).payload,
        state
      );
    case EquipmentCollectionActionTypes.DELETE:
      return adapter.removeOne(
        (action as EquipmentCollectionActions).payload.id,
        state
      );
    case EquipmentCollectionActionTypes.UPDATE:
      return adapter.updateOne(
        {
          id: (action as EquipmentCollectionActions).payload.id,
          changes: (action as EquipmentCollectionActions).payload
        },
        state
      );
    case EquipmentEntryActionTypes.ADD: {
      const payload = (action as AddEquipmentEntryAction).payload;
      const collection = addEntryToCollection(
        payload.collection,
        payload.entry
      );
      return adapter.updateOne(
        {
          id: collection.id,
          changes: collection
        },
        state
      );
    }
    case EquipmentEntryActionTypes.DELETE: {
      const payload = (action as DeleteEquipmentEntryAction).payload;
      const collection = removeEntryFromCollection(
        payload.collection,
        payload.entry
      );
      return adapter.updateOne(
        {
          id: collection.id,
          changes: collection
        },
        state
      );
    }
    default:
      return state;
  }
}

function addEntryToCollection(
  collection: EquipmentCollection,
  entry: EquipmentEntry
): EquipmentCollection {
  return { ...collection, entries: [...(collection.entries || []), entry.id] };
}

function removeEntryFromCollection(
  collection: EquipmentCollection,
  entry: string
): EquipmentCollection {
  return {
    ...collection,
    entries: (collection.entries || []).filter(id => entry !== id)
  };
}
