import {AddAction} from '../util/add-action';
import {EquipmentCollection} from '../reducer/equipment-collection.reducer';
import {EquipmentEntry} from '../reducer/equipment-entries.reducer';
import {EquipmentItem} from '../reducer/equipment-item.reducer';

export const EquipmentItemActionTypes = {
  ADD: '[EquipmentItem] Add'
};

export class EquipmentItemAddAction implements AddAction {
  readonly addAction: boolean = true;
  readonly type: string = EquipmentItemActionTypes.ADD;

  constructor(public readonly collection: EquipmentCollection,
              public readonly entry: EquipmentEntry,
              public readonly payload: EquipmentItem) {}
}
