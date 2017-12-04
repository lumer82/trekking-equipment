import { EquipmentVariant } from '../../../shared/models/equipment-variant.model';
import {
  AddEquipmentVariantAction,
  DeleteEquipmentVariantAction,
  EquipmentVariantActions,
  EquipmentVariantActionTypes, MoveEntryEquipmentVariantAction,
  SelectEquipmentVariantAction, UpdateEquipmentVariantAction
} from '../actions/equipment-variant.actions';
import {
  AddEquipmentCollectionAction, DeleteEquipmentCollectionAction, EquipmentCollectionActions,
  EquipmentCollectionActionTypes
} from '../actions/equipment-collection.actions';
import {
  AddEquipmentEntryAction, DeleteEquipmentEntryAction, EquipmentEntryActions,
  EquipmentEntryActionTypes
} from '../actions/equipment-entry.actions';
import {
  AddEquipmentItemAction,
  DeleteEquipmentItemAction,
  EquipmentItemActions,
  EquipmentItemActionTypes,
  SelectEquipmentItemAction
} from '../actions/equipment-item.actions';
import { createEntityAdapter } from '@ngrx/entity/src/create_adapter';
import { EntityState } from '@ngrx/entity';
import { EntityAdapter } from '@ngrx/entity/src/models';
import { isNullOrUndefined } from 'util';

export interface EquipmentVariantState extends EntityState<EquipmentVariant> {
  selectedVariantIds: {
    [collectionId: string]: string;
  };
}

type State = EquipmentVariantState;

const adapter: EntityAdapter<EquipmentVariant> = createEntityAdapter<EquipmentVariant>()

const initialState = adapter.getInitialState({ selectedVariantIds: {} });

export function equipmentVariantReducer(
  state: State = initialState,
  action:
    | EquipmentItemActions
    | EquipmentEntryActions
    | EquipmentCollectionActions
    | EquipmentVariantActions
): State {
  switch (action.type) {
    case EquipmentVariantActionTypes.ADD: {
      const payload = (action as AddEquipmentVariantAction).payload;
      return adapter.addOne(payload, state);
    }
    case EquipmentVariantActionTypes.DELETE: {
      const payload = (action as DeleteEquipmentVariantAction).payload;
      // There has to be at least one variant
      if (state.ids.length > 1) {
        return adapter.removeOne(payload.id, state);
      }
      break;
    }
    case EquipmentVariantActionTypes.UPDATE: {
      const payload = (action as UpdateEquipmentVariantAction).payload;
      return adapter.updateOne({ id: payload.id, changes: payload}, state);
    }
    case EquipmentVariantActionTypes.SELECT: {
      const payload = (action as SelectEquipmentVariantAction).payload;
      state.selectedVariantIds[payload.collectionId] = payload.variant.id;
      return {...state, selectedVariantIds: {...state.selectedVariantIds } };
    }
    case EquipmentCollectionActionTypes.ADD: {
      const payload = (action as AddEquipmentCollectionAction).payload;
      const variant: EquipmentVariant = { id: 'variant' + Date.now().toString(), name: 'Default', collectionId: payload.id, entries: []};
      state.selectedVariantIds[payload.id] = variant.id;
      return adapter.addOne(variant, {...state, selectedVariantIds: {...state.selectedVariantIds} });
    }
    case EquipmentCollectionActionTypes.DELETE: {
      const payload = (action as DeleteEquipmentCollectionAction).payload;
      const variantIds = Object.keys(state.entities)
        .filter(id => state.entities[id].collectionId === payload.id);
      state.selectedVariantIds[payload.id] = undefined;
      return adapter.removeMany(variantIds, {...state, selectedVariantIds: {...state.selectedVariantIds} });
    }
    case EquipmentEntryActionTypes.ADD: {
      const entry = (action as AddEquipmentEntryAction).payload;
      const variant = state.entities[state.selectedVariantIds[entry.collectionId]];
      const entries = [...variant.entries, { entryId: entry.id }];
      return adapter.updateOne({ id: variant.id, changes: { entries } }, state);
    }
    case EquipmentEntryActionTypes.DELETE: {
      const entry = (action as DeleteEquipmentEntryAction).payload;
      const variants = Object.values(state.entities)
                        .filter(v => !!v.entries.find(e => e.entryId === entry.id))
        .map(variant => ({ id: variant.id, changes: { entries: variant.entries.filter(e => e.entryId !== entry.id ) }}));
      return adapter.updateMany(variants, state);
    }
    case EquipmentVariantActionTypes.MOVE_ENTRY: {
      const payload = (action as MoveEntryEquipmentVariantAction).payload;
      const variant = getVariant(state, payload.collectionId);
      const moveEntry = variant.entries.find(entry => entry.entryId === payload.entryId);
      const oldEntries = variant.entries.filter(entry => entry.entryId !== payload.entryId);
      const entries = [
        ...oldEntries.slice(0, payload.moveTo),
        moveEntry,
        ...oldEntries.slice(payload.moveTo)
      ];
      return adapter.updateOne({id: variant.id, changes: { entries }}, state);
    }
   case EquipmentItemActionTypes.ADD: {
     const item = (action as AddEquipmentItemAction).payload;
     const variant = getVariant(state, item.collectionId);
     const entryIndex = variant.entries.findIndex(e => e.entryId === item.entryId);
     if (!variant.entries[entryIndex].itemId) {
       const entry = {...variant.entries.find(e => e.entryId === item.entryId), itemId: item.id };
       const entries = [...variant.entries.slice(0, entryIndex), entry, ...variant.entries.slice(entryIndex + 1)];
       return adapter.updateOne({ id: variant.id, changes: { entries } }, state);
     }
     break;
   }
   case EquipmentItemActionTypes.SELECT: {
     const item = (action as SelectEquipmentItemAction).payload;
     const variant = getVariant(state, item.collectionId);
     const entryIndex = variant.entries.findIndex(e => e.entryId === item.entryId);
     const entry = {...variant.entries.find(e => e.entryId === item.entryId), itemId: item.id };
     const entries = [...variant.entries.slice(0, entryIndex), entry, ...variant.entries.slice(entryIndex + 1)];
     return adapter.updateOne({ id: variant.id, changes: { entries } }, state);
   }
    default:
      return state;
  }
  return state;
}

export const getSelectedVariantIds = (state: State) => state.selectedVariantIds;

function getVariant(state: State, collectionId: string): EquipmentVariant {
  return state.entities[state.selectedVariantIds[collectionId]];
}
