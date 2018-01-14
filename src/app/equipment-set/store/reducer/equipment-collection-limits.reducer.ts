import { EntityState } from '@ngrx/entity';
import { EquipmentLimits } from '../../../shared/models/equipment-limits.model';
import { createEntityAdapter } from '@ngrx/entity/src/create_adapter';
import { EntityAdapter } from '@ngrx/entity/src/models';
import { EquipmentEntry } from '../../../shared/models/equipment-entry.model';
import {
  EquipmentCollectionLimitActionTypes, EquipmentCollectionLimitsActions,
  SetEquipmentCollectionLimitAction
} from '../actions/equipment-collection-limits.actions';

interface EntityType {
  id: string;
  limits: EquipmentLimits;
}

export interface EquipmentCollectionLimitState extends EntityState<EntityType> {

}

type State = EquipmentCollectionLimitState;

const adapter: EntityAdapter<EntityType> = createEntityAdapter<EntityType>();

const initialState = adapter.getInitialState();

export function equipmentCollectionLimitReducer(state: State = initialState, action: EquipmentCollectionLimitsActions) {
  switch (action.type) {
    case EquipmentCollectionLimitActionTypes.SET:
    {
      const payload = (action as SetEquipmentCollectionLimitAction).payload;
      return (state.ids as Array<string>).findIndex(id => id === payload.id) === -1
        ? adapter.addOne(payload, state)
        : adapter.updateOne({ id: payload.id, changes: payload.limits}, state);
    }
    default:
      return state;
  }
}
