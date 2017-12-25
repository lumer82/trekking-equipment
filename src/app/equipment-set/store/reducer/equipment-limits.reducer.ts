import { EntityState } from '@ngrx/entity';
import { createEntityAdapter } from '@ngrx/entity/src/create_adapter';
import { EntityAdapter } from '@ngrx/entity/src/models';
import { Action } from '@ngrx/store';
import { EquipmentLimit, IconType } from '../../../shared/models/equipment-limit.model';


export interface EquipmentLimitsState extends EntityState<EquipmentLimit> {

}

const adapter: EntityAdapter<EquipmentLimit> =
  createEntityAdapter<EquipmentLimit>({ selectId: l => l.name});

const initialLimits: Array<EquipmentLimit> = [
  {
    name: 'price',
    icon: {
      name: 'attach_money',
      type: IconType.MATERIAL
    }
  },
  {
    name: 'weight',
    icon: {
      name: 'fitness_center',
      type: IconType.MATERIAL
    }
  },
  {
    name: 'volume',
    icon: {
      name: 'border_outer',
      type: IconType.MATERIAL
    }
  }
];

const initialState = adapter.addAll(initialLimits, adapter.getInitialState());

type State = EquipmentLimitsState;

export function equipmentLimitsReducer(state: State = initialState, action: Action): State {
  return state;
}
