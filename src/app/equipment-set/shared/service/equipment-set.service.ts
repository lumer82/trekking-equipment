import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { EquipmentSet } from '../../../shared/domain/equipment-set';
import { Collection } from '../../../shared/domain/collection';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { max } from 'rxjs/operator/max';

@Injectable()
export class EquipmentSetService {

  private _equipmentSet$: BehaviorSubject<EquipmentSet> = new BehaviorSubject<EquipmentSet>(null);
  private _equipmentSet: EquipmentSet;
  equipmentSet$: Observable<EquipmentSet> = this._equipmentSet$.asObservable();

  constructor() {
    this.equipmentSet$.subscribe(equipmentSet => this._equipmentSet = equipmentSet);
  }

  createNewSet(): EquipmentSet {
    const equipmentSet = new EquipmentSet();
    this._equipmentSet$.next(equipmentSet);
    return equipmentSet;
  }

  addCollection(): Collection {
    const collection = {...new Collection(), id: Date.now()};
    const maxOrder = Math.max(0, ...Object.values(this._equipmentSet.collections).map((c: {order: number}) => c.order));
    const equipmentSet = this._equipmentSet;
    equipmentSet.collections[collection.id] = {
      order: maxOrder + 1,
      collection: collection
    };
    this._equipmentSet$.next({...this._equipmentSet});
    return collection;
  }
}
