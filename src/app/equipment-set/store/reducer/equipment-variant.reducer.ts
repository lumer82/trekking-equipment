import { EquipmentVariant } from '../../../shared/models/equipment-variant.model';
import { EquipmentVariantActions, EquipmentVariantActionTypes } from '../actions/equipment-variant.actions';
import { EquipmentCollectionActions } from '../actions/equipment-collection.actions';
import { EquipmentEntryActions } from '../actions/equipment-entry.actions';
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

export interface EquipmentVariantState extends EntityState<EquipmentVariant> {
  selectedVariantId: string;
}

type State = EquipmentVariantState;

const adapter: EntityAdapter<EquipmentVariant> = createEntityAdapter<EquipmentVariant>()

const initialVariant: EquipmentVariant = { id: Date.now().toString(), name: 'Default', selectedItems: {}};

const initialState = adapter.addOne(initialVariant, adapter.getInitialState({ selectedVariantId: initialVariant.id }));

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
      const payload = (action as EquipmentVariantActions).payload;
      return adapter.addOne(payload, state);
    }
    case EquipmentVariantActionTypes.DELETE: {
      const payload = (action as EquipmentVariantActions).payload;
      // There has to be at least one variant
      if (state.ids.length > 1) {
        return adapter.removeOne(payload.id, state);
      }
      break;
    }
    case EquipmentVariantActionTypes.UPDATE: {
      const payload = (action as EquipmentVariantActions).payload;
      return adapter.updateOne({ id: payload.id, changes: payload}, state);
    }
    case EquipmentVariantActionTypes.SELECT: {
      const payload = (action as EquipmentVariantActions).payload;
      return {...state, selectedVariantId: payload.id};
    }
    case EquipmentItemActionTypes.ADD: {
      const item = (action as AddEquipmentItemAction).payload;
      const variant = state.entities[state.selectedVariantId];
      if (!variant.selectedItems[item.entryId]) {
        variant.selectedItems[item.entryId] = item.id;
        return adapter.updateOne({ id: variant.id, changes: {...variant}}, state);
      }
      break;
    }
    case EquipmentItemActionTypes.DELETE: {
      const item = (action as DeleteEquipmentItemAction).payload;
      const variant = state.entities[state.selectedVariantId];
      if (variant.selectedItems[item.entryId] === item.id) {
        variant.selectedItems[item.entryId] = null;
        return adapter.updateOne({ id: variant.id, changes: {...variant}}, state);
      }
      break;
    }
    case EquipmentItemActionTypes.SELECT: {
      const item = (action as SelectEquipmentItemAction).payload;
      const variant = state.entities[state.selectedVariantId];
      variant.selectedItems[item.entryId] = item.id;
      return adapter.updateOne({ id: variant.id, changes: {...variant}}, state);
    }
    default:
      return state;
  }
  return state;
}

export const getSelectedVariantId = (state: State) => state.selectedVariantId;
