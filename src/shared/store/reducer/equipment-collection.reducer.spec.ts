import {
  EquipmentCollection, equipmentCollectionsReducer,
  EquipmentCollectionsState
} from './equipment-collection.reducer';
import { EquipmentCollectionAddAction } from '../actions/equipment-collection.actions';
import { EquipmentEntryAddAction } from '../actions/equipment-entry.actions';
import { EquipmentEntry } from './equipment-entries.reducer';

describe('EquipmentCollectionReducer', () => {
  describe('undefined action and state', () => {
    it('should return the default state', () => {
      const actual = equipmentCollectionsReducer(undefined, {} as any);
      expect(actual).toMatchSnapshot();
    });
  });

  describe('add collection', () => {
    it('should add the collection to the state', () => {
      const id = Math.random() * Math.pow(10, 10) + '';
      const collection: EquipmentCollection = { id, name: 'Test', entries: null };
      const actual = equipmentCollectionsReducer(undefined, new EquipmentCollectionAddAction(collection));
      expect(actual.entities[id]).toBe(collection);
    });
  });

  describe('add entry', () => {
    it('should add an entry to the collection', () => {
      const entry: EquipmentEntry = { id: '98765', name: 'Entry', items: undefined };
      const collection: EquipmentCollection = { id: '12345', name: 'Test', entries: undefined };
      const state: EquipmentCollectionsState = { ids: ['12345'], entities: { 12345: collection } };
      const actual = equipmentCollectionsReducer(state, new EquipmentEntryAddAction(collection, entry));
      expect(actual.entities['12345'].entries.entities['98765']).toEqual(entry);
      expect(actual).not.toBe(state);
    });

    it('should not add an entry to the wrong collection', () => {
      const entry: EquipmentEntry = { id: '98765', name: 'Entry', items: undefined };
      const collection1: EquipmentCollection = { id: '12345', name: 'Test1', entries: undefined };
      const collection2: EquipmentCollection = { id: '23456', name: 'Test2', entries: undefined };
      const state: EquipmentCollectionsState = { ids: ['12345'], entities: { 12345: collection1, 23456: collection2 } };
      const actual = equipmentCollectionsReducer(state, new EquipmentEntryAddAction(collection1, entry));
      expect(actual.entities[collection2.id].entries).toBeFalsy();
      expect(actual).not.toBe(state);
    });
  });
});
