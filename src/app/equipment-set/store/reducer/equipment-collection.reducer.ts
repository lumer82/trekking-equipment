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
  EquipmentCollectionActions, MoveEquipmentCollectionAction, UpdateEquipmentCollectionAction, UpdateTotalsEquipmentCollectionAction
} from '../actions/equipment-collection.actions';
import { EquipmentTotals } from '../../../shared/models/equipment-totals.model';

export interface EquipmentCollectionState
  extends EntityState<EquipmentCollection> {
  order: Array<string>;
  totals: { [id: string]: EquipmentTotals };
}

type State = EquipmentCollectionState;

const adapter: EntityAdapter<EquipmentCollection> = createEntityAdapter<
  EquipmentCollection
>();

const initialState: EquipmentCollectionState = adapter.getInitialState({ order: [], totals: {} });

export function equipmentCollectionReducer(
  state: State = initialState,
  action: EquipmentCollectionActions | EquipmentEntryActions
): State {
  switch (action.type) {
    case EquipmentCollectionActionTypes.ADD:
    {
      const collection = (action as AddEquipmentCollectionAction).payload;
      const order = [...state.order, collection.id];
      return adapter.addOne(
        collection,
        { ...state, order }
      );
    }
    case EquipmentCollectionActionTypes.DELETE:
    {
      const collectionId = (action as DeleteEquipmentCollectionAction).payload.id;
      const order = state.order.filter(id => id !== collectionId);
      return adapter.removeOne(
        collectionId,
        { ...state, order }
      );
    }
    case EquipmentCollectionActionTypes.UPDATE:
      return adapter.updateOne(
        (action as UpdateEquipmentCollectionAction).payload,
        state
      );
    case EquipmentCollectionActionTypes.UPDATE_TOTALS:
    {
      const totals = (action as UpdateTotalsEquipmentCollectionAction).payload;
      return { ...state, totals };
    }
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
    case EquipmentCollectionActionTypes.MOVE: {
      const payload = (action as MoveEquipmentCollectionAction).payload;
      const otherCollections = state.order.filter(id => id !== payload.id);
      const order = [...otherCollections.slice(0, payload.moveTo), payload.id, ...otherCollections.slice(payload.moveTo)];
      return {...state, order};
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
