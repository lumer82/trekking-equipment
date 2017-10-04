import { AddAction } from '../util/add-action';
import { EquipmentCollection } from '../reducer/equipment-collection.reducer';
import { EquipmentEntry } from '../reducer/equipment-entries.reducer';

export const EquipmentEntryActionTypes = {
  ADD: '[EquipmentEntryAction] Add'
};

export class EquipmentEntryAddAction implements AddAction {
  readonly addAction: boolean = true;
  readonly type: string = EquipmentEntryActionTypes.ADD;

  constructor(public readonly collection: EquipmentCollection,
              public readonly payload: EquipmentEntry) {}
}

export type EquipmentEntryActions =
  EquipmentEntryAddAction;
