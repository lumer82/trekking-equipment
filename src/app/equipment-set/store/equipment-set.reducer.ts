import { EntityState } from '@ngrx/entity';
import { equipmentCollectionReducer } from './reducer/equipment-collection.reducer';
import { EquipmentCollection } from './../../shared/models/equipment-collection.model';
import { ActionReducerMap } from '@ngrx/store';
import { equipmentSetNameReducer } from './reducer/equipment-set.name.reducer';
import { createFeatureSelector } from '@ngrx/store/src/selector';

export const EQUIPMENT_SET_FEATURE_NAME = 'equipmentSet';

export interface EquipmentSetState {
  name: string;
  collections: EntityState<EquipmentCollection>;
}

export const equipmentSetReducer: ActionReducerMap<any> = {
  name: equipmentSetNameReducer,
  collections: equipmentCollectionReducer
};

export const selectEquipmentSet = createFeatureSelector<EquipmentSetState>(EQUIPMENT_SET_FEATURE_NAME);
