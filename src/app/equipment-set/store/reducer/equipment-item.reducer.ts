import {
  AddEquipmentItemAction,
  EquipmentItemActionTypes,
  DeleteEquipmentItemAction,
  UpdateEquipmentItemAction,
  EquipmentItemActions
} from './../actions/equipment-item.actions';
import {
  EquipmentCollectionActions,
  EquipmentCollectionActionTypes,
  DeleteEquipmentCollectionAction
} from './../actions/equipment-collection.actions';
import {
  EquipmentEntryActions,
  EquipmentEntryActionTypes,
  DeleteEquipmentEntryAction
} from './../actions/equipment-entry.actions';
import { createEntityAdapter } from '@ngrx/entity/src/create_adapter';
import { EntityAdapter } from '@ngrx/entity/src/models';
import { EntityState } from '@ngrx/entity';
import { EquipmentItem } from '../../../shared/models/equipment-item.model';

export interface EquipmentItemState extends EntityState<EquipmentItem> {}

type State = EquipmentItemState;

const adapter: EntityAdapter<EquipmentItem> = createEntityAdapter<
  EquipmentItem
>();

export function equipmentItemReducer(
  state: State = adapter.getInitialState(),
  action:
    | EquipmentItemActions
    | EquipmentEntryActions
    | EquipmentCollectionActions
): State {
  switch (action.type) {
    case EquipmentItemActionTypes.ADD: {
      const payload = (action as AddEquipmentItemAction).payload;
      return adapter.addOne(payload, state);
    }
    case EquipmentItemActionTypes.DELETE: {
      const payload = (action as DeleteEquipmentItemAction).payload;
      return adapter.removeOne(payload.id, state);
    }
    case EquipmentItemActionTypes.UPDATE: {
      const payload = (action as UpdateEquipmentItemAction).payload;
      return adapter.updateOne({ id: payload.id, changes: payload }, state);
    }
    case EquipmentEntryActionTypes.DELETE: {
      const payload = (action as DeleteEquipmentEntryAction).payload;
      return adapter.removeMany(payload.items, state);
    }
    case EquipmentCollectionActionTypes.DELETE: {
      const payload = (action as DeleteEquipmentCollectionAction).payload;
      const deleteItems = Object.keys(state.entities)
        .map(id => state.entities[id])
        .filter(item => item.collectionId === payload.id)
        .map(item => item.id);
        return adapter.removeMany(deleteItems, state);
    }
    default:
      return state;
  }
}
