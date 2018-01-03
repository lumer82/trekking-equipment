import { EntityState } from '@ngrx/entity';
import { createEntityAdapter } from '@ngrx/entity/src/create_adapter';
import { EntityAdapter } from '@ngrx/entity/src/models';
import { Action } from '@ngrx/store';
import { EquipmentLimitDefinition, IconType, LimitType } from '../../../shared/models/equipment-limit-definition.model';
import {
  AddEquipmentLimitsAction, DeleteEquipmentLimitsAction, EquipmentLimitsActions, EquipmentLimitsActionTypes,
  UpdateEquipmentLimitsAction, UpdateManyEquipmentLimitsAction
} from '../actions/equipment-limits.actions';


export interface EquipmentLimitsState extends EntityState<EquipmentLimitDefinition> {

}

const adapter: EntityAdapter<EquipmentLimitDefinition> =
  createEntityAdapter<EquipmentLimitDefinition>({ selectId: l => l.name});

const initialLimits: Array<EquipmentLimitDefinition> = [
  {
    name: 'price',
    type: LimitType.GLOBAL,
    displayName: 'Price',
    icon: {
      name: 'attach_money',
      type: IconType.MATERIAL
    }
  },
  {
    name: 'weight',
    type: LimitType.LOCAL,
    displayName: 'Weight',
    icon: {
      name: 'fitness_center',
      type: IconType.MATERIAL
    }
  },
  {
    name: 'volume',
    type: LimitType.LOCAL,
    displayName: 'Volume',
    icon: {
      name: 'border_outer',
      type: IconType.MATERIAL
    }
  }
];

const initialState = adapter.addAll(initialLimits, adapter.getInitialState());

type State = EquipmentLimitsState;

export function equipmentLimitsReducer(state: State = initialState, action: EquipmentLimitsActions): State {
  switch (action.type) {
    case EquipmentLimitsActionTypes.ADD:
    {
      const limit: EquipmentLimitDefinition = (action as AddEquipmentLimitsAction).payload;
      return adapter.addOne(limit, state);
    }
    case EquipmentLimitsActionTypes.UPDATE:
    {
      const payload = (action as UpdateEquipmentLimitsAction).payload;
      return adapter.updateOne(payload, state);
    }
    case EquipmentLimitsActionTypes.UPDATE_MANY:
    {
      const payload = (action as UpdateManyEquipmentLimitsAction).payload;
      const added = payload.filter(update => (state.ids as Array<string>).findIndex(id => id === update.id) === -1)
        .map(update => update.changes);
      const newState = adapter.addMany(added, state);
      return adapter.updateMany(payload, newState);
    }
    case EquipmentLimitsActionTypes.DELETE:
    {
      const id: string = (action as DeleteEquipmentLimitsAction).payload;
      return adapter.removeOne(id, state);
    }
    default:
      return state;
  }
}
