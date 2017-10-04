import {EquipmentItem, equipmentItemsReducer} from './equipment-item.reducer';
import {EquipmentItemAddAction} from '../actions/equipment-item.actions';

describe('EquipmentItemReducer', () => {
  describe('add', () => {
    it('should add entry', () => {
      const item: EquipmentItem = { id: '12345', name: 'Test', price: null, weight: null }
      const actual = equipmentItemsReducer(undefined, new EquipmentItemAddAction(null, null, item));
      expect(actual.entities[item.id]).toEqual(item);
    });
  });
});
