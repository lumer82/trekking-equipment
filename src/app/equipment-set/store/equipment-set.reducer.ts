import { EntityState } from '@ngrx/entity';
import { ActionReducerMap } from '@ngrx/store';
import { createFeatureSelector, createSelector } from '@ngrx/store/src/selector';
import { EquipmentCollection } from '../../shared/models/equipment-collection.model';
import { EquipmentEntry } from '../../shared/models/equipment-entry.model';
import { EquipmentItem } from '../../shared/models/equipment-item.model';
import { equipmentCollectionReducer } from './reducer/equipment-collection.reducer';
import { equipmentEntryReducer } from './reducer/equipment-entry.reducer';
import { equipmentItemReducer } from './reducer/equipment-item.reducer';
import { equipmentSetSettingsReducer, EquipmentSetSettingsState } from './reducer/equipment-set-settings.reducer';
import {
  equipmentVariantReducer, EquipmentVariantState,
  getSelectedVariantIds
} from './reducer/equipment-variant.reducer';

export const EQUIPMENT_SET_FEATURE_NAME = 'equipmentSet';

export interface EquipmentSetState {
  settings: EquipmentSetSettingsState;
  collections: EntityState<EquipmentCollection>;
  entries: EntityState<EquipmentEntry>;
  items: EntityState<EquipmentItem>;
  variants: EquipmentVariantState;
}

export const equipmentSetReducer: ActionReducerMap<any> = {
  settings: equipmentSetSettingsReducer,
  collections: equipmentCollectionReducer,
  entries: equipmentEntryReducer,
  items: equipmentItemReducer,
  variants: equipmentVariantReducer
};

export const selectEquipmentSet = createFeatureSelector<EquipmentSetState>(EQUIPMENT_SET_FEATURE_NAME);

export const selectEquipmentSetSettings = createSelector(selectEquipmentSet, (state: EquipmentSetState) => state.settings);

export const selectEquipmentEntries = createSelector(selectEquipmentSet, (state: EquipmentSetState) => state.entries);

export const selectEquipmentItems = createSelector(selectEquipmentSet, (state: EquipmentSetState) => state.items);

export const selectEquipmentVariants = createSelector(selectEquipmentSet, (state: EquipmentSetState) => state.variants);

export const selectSelectedVariantIds = createSelector(selectEquipmentVariants, getSelectedVariantIds);
