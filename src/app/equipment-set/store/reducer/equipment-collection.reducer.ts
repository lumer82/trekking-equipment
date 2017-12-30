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
import {
  AddEquipmentCollectionAction, DeleteEquipmentCollectionAction,
  EquipmentCollectionActions, UpdateEquipmentCollectionAction
} from '../actions/equipment-collection.actions';

export interface EquipmentCollectionState
  extends EntityState<EquipmentCollection> {
  metadata: Array<{
    collectionId: string;
    totals?: { [limit: string]: number };
  }>;
}

type State = EquipmentCollectionState;

const adapter: EntityAdapter<EquipmentCollection> = createEntityAdapter<
  EquipmentCollection
>();

const initialState: EquipmentCollectionState = adapter.getInitialState({ metadata: [] });

export function equipmentCollectionReducer(
  state: State = initialState,
  action: EquipmentCollectionActions | EquipmentEntryActions
): State {
  switch (action.type) {
    case EquipmentCollectionActionTypes.ADD:
    {
      const collection = (action as AddEquipmentCollectionAction).payload;
      const metadata = [...state.metadata, { collectionId: collection.id }]
      return adapter.addOne(
        collection,
        { ...state, metadata }
      );
    }
    case EquipmentCollectionActionTypes.DELETE:
    {
      const collectionId = (action as DeleteEquipmentCollectionAction).payload.id;
      const metadata = state.metadata.filter(md => md.collectionId !== collectionId);
      return adapter.removeOne(
        collectionId,
        { ...state, metadata }
      );
    }
    case EquipmentCollectionActionTypes.UPDATE:
      return adapter.updateOne(
        (action as UpdateEquipmentCollectionAction).payload,
        state
      );
    case EquipmentEntryActionTypes.ADD: {
      const payload = (action as AddEquipmentEntryAction).payload;
      const collection = addEntryToCollection(
        state.entities[payload.collectionId],
        payload
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
        state.entities[payload.collectionId],
        payload
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
  entry: EquipmentEntry
): EquipmentCollection {
  return {
    ...collection,
    entries: (collection.entries || []).filter(id => entry.id !== id)
  };
}
