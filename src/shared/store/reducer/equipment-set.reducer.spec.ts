import {equipmentSetReducer, EquipmentSetState} from './equipment-set.reducer';
import {EquipmentCollectionAddAction} from '../actions/equipment-collection.actions';
import {EquipmentCollection} from './equipment-collection.reducer';
import {EquipmentEntry} from './equipment-entries.reducer';
import {EquipmentItem} from './equipment-item.reducer';
import {EquipmentEntryAddAction} from '../actions/equipment-entry.actions';
import {EquipmentItemAddAction} from '../actions/equipment-item.actions';

describe('EquipmentSetReducer', () => {
  describe('add', () => {
    const collection: EquipmentCollection = {id: 'collection_1', name: 'collection_1', entries: undefined};
    const entry: EquipmentEntry = {id: 'entry_1', name: 'entry_1', items: undefined};
    const item: EquipmentItem = {id: 'item_1', name: 'item_1', weight: undefined, price: undefined};
    it('should add a new collection', () => {
      const actual = equipmentSetReducer(undefined, new EquipmentCollectionAddAction(collection));

      console.log('collection is', actual.collections);
      expect(actual.collections.entities[collection.id]).toBe(collection);
    });

    it('should add a new entry to given collection', () => {
      const state: EquipmentSetState = {
        name: 'set_1',
        collections: {
          ids: [collection.id],
          entities: {
            'collection_1': collection
          }
        }
      };

      const actual = equipmentSetReducer(state, new EquipmentEntryAddAction(collection, entry));
      expect(actual).toMatchSnapshot();
    })

    it('should add a new item to given collection and entry', () => {
      const state: EquipmentSetState = {
        name: 'set_1',
        collections: {
          ids: [collection.id],
          entities: {
            'collection_1':
              {
                ...collection, entries: {
                  selectedItemId: undefined,
                  ids: [entry.id],
                  entities: {
                    'entry_1': entry
                  }
                }
              }
          }
        }
      };

      const actual = equipmentSetReducer(state, new EquipmentItemAddAction(collection, entry, item));
      expect(actual).toMatchSnapshot();
    });
  });
});
