import { EquipmentEntry } from './../../shared/models/equipment-entry.model';
import { EntityState } from '@ngrx/entity';
import { equipmentCollectionReducer } from './reducer/equipment-collection.reducer';
import { EquipmentCollection } from './../../shared/models/equipment-collection.model';
import { ActionReducerMap } from '@ngrx/store';
import { equipmentSetNameReducer } from './reducer/equipment-set.name.reducer';
import { createFeatureSelector, createSelector } from '@ngrx/store/src/selector';
import { equipmentEntryReducer } from './reducer/equipment-entry.reducer';

export const EQUIPMENT_SET_FEATURE_NAME = 'equipmentSet';

export interface EquipmentSetState {
  name: string;
  collections: EntityState<EquipmentCollection>;
  entries: EntityState<EquipmentEntry>;
}

export const equipmentSetReducer: ActionReducerMap<any> = {
  name: equipmentSetNameReducer,
  collections: equipmentCollectionReducer,
  entries: equipmentEntryReducer
};

export const selectEquipmentSet = createFeatureSelector<EquipmentSetState>(EQUIPMENT_SET_FEATURE_NAME);

export const selectEquipmentEntries = createSelector(selectEquipmentSet, (state: EquipmentSetState) => state.entries);
