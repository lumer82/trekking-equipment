import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { UpdateTotalsEquipmentCollectionAction } from '../actions/equipment-collection.actions';
import { Observable } from 'rxjs/Observable';
import { EquipmentVariantActionTypes } from '../actions/equipment-variant.actions';
import { CalculateTotalsService } from '../../services/calculate-totals.service';
import {
  EquipmentSetFeatureState, selectEquipmentCollections, selectEquipmentLimits,
  selectEquipmentVariants
} from '../equipment-set.reducer';
import { Store } from '@ngrx/store';
import { withLatestFrom, map } from 'rxjs/operators';

@Injectable()
export class EquipmentCollectionEffects {

  @Effect() updateTotals$: Observable<UpdateTotalsEquipmentCollectionAction> =
    this.actions$.ofType(EquipmentVariantActionTypes.UPDATE_TOTALS).pipe(
      withLatestFrom(this.store.select(selectEquipmentCollections)),
      map(([action, collectionState]) => collectionState.order),
      withLatestFrom(this.store.select(selectEquipmentVariants)),
      map(([order, variants]) => ({ order, totals: order.reduce((totals, id) => {
          totals[id] = variants.entities[variants.selectedVariantIds[id]].totals;
          return totals;
        }, {})})),
      withLatestFrom(this.store.select(selectEquipmentLimits).pipe(
        map(limits => (limits.ids as Array<string>).map(id => limits.entities[id])))
      ),
      map(([{order, totals}, limits]) =>
        this.calculateTotalsService.calculateTotalsForCollections(
          order,
          totals,
          limits)),
      map(totals => new UpdateTotalsEquipmentCollectionAction(totals))
    );

  constructor(private actions$: Actions,
              private store: Store<EquipmentSetFeatureState>,
              private calculateTotalsService: CalculateTotalsService) {}
}
