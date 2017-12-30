import { EntityState } from '@ngrx/entity';
import { ActionReducerMap } from '@ngrx/store';
import { createFeatureSelector, createSelector } from '@ngrx/store/src/selector';
import { EquipmentCollection } from '../../shared/models/equipment-collection.model';
import { EquipmentEntry } from '../../shared/models/equipment-entry.model';
import { EquipmentItem } from '../../shared/models/equipment-item.model';
import { equipmentCollectionReducer, EquipmentCollectionState } from './reducer/equipment-collection.reducer';
import { equipmentEntryReducer } from './reducer/equipment-entry.reducer';
import { equipmentItemReducer } from './reducer/equipment-item.reducer';
import { equipmentLimitsReducer, EquipmentLimitsState } from './reducer/equipment-limits.reducer';
import { equipmentSetSettingsReducer, EquipmentSetSettingsState } from './reducer/equipment-set-settings.reducer';
import {
  equipmentVariantReducer, EquipmentVariantState,
  getSelectedVariantIds
} from './reducer/equipment-variant.reducer';

export const EQUIPMENT_SET_FEATURE_NAME = 'equipmentSet';

export interface EquipmentSetFeatureState {
  equipmentSet: EquipmentSetState;
}

export interface EquipmentSetState {
  settings: EquipmentSetSettingsState;
  collections: EquipmentCollectionState;
  entries: EntityState<EquipmentEntry>;
  items: EntityState<EquipmentItem>;
  variants: EquipmentVariantState;
  limits: EquipmentLimitsState;
}

export const equipmentSetReducer: ActionReducerMap<any> = {
  settings: equipmentSetSettingsReducer,
  collections: equipmentCollectionReducer,
  entries: equipmentEntryReducer,
  items: equipmentItemReducer,
  variants: equipmentVariantReducer,
  limits: equipmentLimitsReducer
};

export const selectEquipmentSet = createFeatureSelector<EquipmentSetState>(EQUIPMENT_SET_FEATURE_NAME);

export const selectEquipmentSetSettings = createSelector(selectEquipmentSet, (state: EquipmentSetState) => state.settings);

export const selectEquipmentEntries = createSelector(selectEquipmentSet, (state: EquipmentSetState) => state.entries);

export const selectEquipmentItems = createSelector(selectEquipmentSet, (state: EquipmentSetState) => state.items);

export const selectEquipmentVariants = createSelector(selectEquipmentSet, (state: EquipmentSetState) => state.variants);

export const selectSelectedVariantIds = createSelector(selectEquipmentVariants, getSelectedVariantIds);

export const selectEquipmentLimits = createSelector(selectEquipmentSet, (state: EquipmentSetState) => state.limits);
