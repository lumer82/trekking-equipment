import { TestBed, inject } from '@angular/core/testing';

import { EquipmentSetService } from './equipment-set.service';
import { EquipmentSet } from '../../../shared/domain/equipment-set';
import { Observable } from 'rxjs/Observable';
import { Collection } from '../../../shared/domain/collection';

describe('EquipmentSetService', () => {
  let service: EquipmentSetService;
  beforeEach(() => {
    service = new EquipmentSetService();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('create set', () => {
    it('should create a new set', () => {
      const actual: EquipmentSet = service.createNewSet();
      expect(actual).toBeTruthy();
      service.equipmentSet$.subscribe(set => expect(set).toBe(actual));
    });
  });

  describe('modify', () => {

    beforeEach(() => {
      service.createNewSet();
    });

    describe('collection', () => {
      it('should add collection', () => {
        let actual: EquipmentSet;
        expect(service.equipmentSet$).toBeTruthy();
        service.equipmentSet$.subscribe(set => actual = set);
        const collection: Collection = service.addCollection();

        expect(collection).toBeTruthy();
        expect(collection.id).toBeTruthy();
        expect(actual.collections[collection.id].collection).toBe(collection);
        expect(actual.collections[collection.id].order).toEqual(1);
      });

      it('should update collection', () => {
        const collection: Collection = service.addCollection();
        const expected: Collection = {
            ...collection,
            settings: {
              title: 'test',
              budget: 2000,
              weight: 10000
            }
          };
        let set: EquipmentSet;
        service.equipmentSet$.subscribe(s => set = s);
        expect(set.collections[expected.id].collection).toEqual(collection);
      });
    });
  });
});
