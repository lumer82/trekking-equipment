import { Action } from '@ngrx/store';
import { EquipmentCollection } from '../reducer/equipment-collection.reducer';
import { EquipmentEntry } from '../reducer/equipment-entries.reducer';

export interface AddAction extends Action {
  readonly addAction: boolean;
  collection?: EquipmentCollection;
  entry?: EquipmentEntry;
}
