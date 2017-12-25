import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators';
import { EquipmentLimitDefinition } from '../../shared/models/equipment-limit-definition.model';
import { EquipmentSetFeatureState, selectEquipmentLimits } from './equipment-set.reducer';

@Injectable()
export class StoreSelectHelperService {
  constructor(private store: Store<EquipmentSetFeatureState>) {}

  getLimitDefinitions(): Observable<Array<EquipmentLimitDefinition>> {
    return this.store.select(selectEquipmentLimits).pipe(
      map(limits => (limits.ids as string[]).map(id => limits.entities[id]))
    );
  }
}
