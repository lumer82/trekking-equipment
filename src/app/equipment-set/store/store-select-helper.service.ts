import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators';
import { EquipmentLimitDefinition } from '../../shared/models/equipment-limit-definition.model';
import { EquipmentSetFeatureState, selectEquipmentCollections, selectEquipmentLimits } from './equipment-set.reducer';
import { EquipmentTotals } from '../../shared/models/equipment-totals.model';

@Injectable()
export class StoreSelectHelperService {
  constructor(private store: Store<EquipmentSetFeatureState>) {}

  getLimitDefinitions(): Observable<Array<EquipmentLimitDefinition>> {
    return this.store.select(selectEquipmentLimits).pipe(
      map(limits => (limits.ids as string[]).map(id => limits.entities[id]))
    );
  }

  getStartValues(collectionId: string): Observable<EquipmentTotals> {
    return this.store.select(selectEquipmentCollections).pipe(
      map(collectionState => {
        const index = collectionState.order.findIndex(id => id === collectionId);
        return index > 0 ? collectionState.totals[collectionState.order[index - 1]] : null;
      })
    );
  }
}
