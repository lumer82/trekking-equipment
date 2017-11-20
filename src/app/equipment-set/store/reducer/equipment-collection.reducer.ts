import { EquipmentCollectionActionTypes } from './../actions/equipment-collection.actions';
import { EntityState } from '@ngrx/entity';
import { EquipmentCollection } from '../../../shared/models/equipment-collection.model';
import { EntityAdapter } from '@ngrx/entity/src/models';
import { createEntityAdapter } from '@ngrx/entity/src/create_adapter';
import { EquipmentCollectionActions } from '../actions/equipment-collection.actions';

export interface EquipmentCollectionState extends EntityState<EquipmentCollection> {
}

type State = EquipmentCollectionState;

const adapter: EntityAdapter<EquipmentCollection> = createEntityAdapter<EquipmentCollection>();

export function equipmentCollectionReducer(state: State = adapter.getInitialState(), action: EquipmentCollectionActions): State {
  switch (action.type) {
    case EquipmentCollectionActionTypes.ADD:
      return adapter.addOne(action.payload, state);
    case EquipmentCollectionActionTypes.DELETE:
      return adapter.removeOne(action.payload.id, state);
      case EquipmentCollectionActionTypes.UPDATE:
      return adapter.updateOne({ id: action.payload.id, changes: action.payload}, state);
    default:
      return state;
  }
}
