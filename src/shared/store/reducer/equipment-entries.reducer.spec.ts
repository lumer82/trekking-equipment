import {equipmentEntriesReducer, EquipmentEntriesState, EquipmentEntry} from './equipment-entries.reducer';
import { EquipmentEntryAddAction } from '../actions/equipment-entry.actions';
import {EquipmentItemAddAction} from '../actions/equipment-item.actions';
import {EquipmentItem} from './equipment-item.reducer';

describe('EquipmentEntriesReducer', () => {
  describe('add', () => {
    it('should add entry', () => {
      const entry: EquipmentEntry = { id: '12345', name: 'Test', items: undefined }
      const actual = equipmentEntriesReducer(undefined, new EquipmentEntryAddAction(null, entry));
      expect(actual.entities[entry.id]).toEqual(entry);
    });

    it('should add a new item', () => {
      const entry: EquipmentEntry = { id: '12345', name: 'Test', items: undefined }
      const item: EquipmentItem = { id: 'item_1', name: 'item_1', weight: undefined, price: undefined };
      const state = {selectedItemId: undefined, ids: [entry.id], entities: { 12345: entry}};
      const actual = equipmentEntriesReducer(state, new EquipmentItemAddAction(null, entry, item));
      expect(actual).not.toBe(state);
      expect(actual.entities[entry.id].items.entities[item.id]).toBe(item);
    });
  });
});
