import { ActionReducerMap } from '@ngrx/store';
import { equipmentSetNameReducer } from './reducer/equipment-set.name.reducer';
import { createFeatureSelector } from '@ngrx/store/src/selector';

export const EQUIPMENT_SET_FEATURE_NAME = 'equipmentSet'

export interface EquipmentSetState {
  name: string;
}

export const equipmentSetReducer: ActionReducerMap<any> = {
  name: equipmentSetNameReducer
}

export const selectEquipmentSet = createFeatureSelector<EquipmentSetState>(EQUIPMENT_SET_FEATURE_NAME);
