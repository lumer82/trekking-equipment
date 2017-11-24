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

export function equipmentEntryReducer(state: State = adapter.getInitialState(), action: EquipmentEntryActions): State {
  switch (action.type) {
    case EquipmentEntryActionTypes.ADD: {
      const payload = (action as AddEquipmentEntryAction).payload;
      return adapter.addOne(payload.entry, state);
    }
    case EquipmentEntryActionTypes.DELETE: {
      const payload = (action as DeleteEquipmentEntryAction).payload;
      return adapter.removeOne(payload.entry, state);
    }
    case EquipmentEntryActionTypes.UPDATE: {
      const payload = (action as UpdateEquipmentEntryAction).payload;
      return adapter.updateOne({ id: payload.entry.id, changes: payload.entry}, state);
    }
    default:
      return state;
  }
}
