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
    case EquipmentEntryActionTypes.ADD:
      return adapter.addOne(action.payload.entry, state);
    case EquipmentEntryActionTypes.DELETE:
      return adapter.removeOne(action.payload.entry.id, state);
      case EquipmentEntryActionTypes.UPDATE:
      return adapter.updateOne({ id: action.payload.entry.id, changes: action.payload.entry}, state);
    default:
      return state;
  }
}
