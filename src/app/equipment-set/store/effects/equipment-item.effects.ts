import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { filter, map, switchMap, tap, withLatestFrom } from 'rxjs/operators';
import { EquipmentVariant } from '../../../shared/models/equipment-variant.model';
import {
  AddEquipmentItemAction, EquipmentItemActionTypes,
  SelectEquipmentItemAction
} from '../actions/equipment-item.actions';
import { selectEquipmentEntries, selectEquipmentItems, selectEquipmentVariants } from '../equipment-set.reducer';
import { EquipmentVariantState } from '../reducer/equipment-variant.reducer';

@Injectable()
export class EquipmentItemEffects {

  @Effect()
  selectFirstItemOnAdd: Observable<SelectEquipmentItemAction> =
    this.actions.ofType(EquipmentItemActionTypes.ADD)
      .pipe(
        map(action => (action as AddEquipmentItemAction).payload),
        withLatestFrom(this.store.select(selectEquipmentVariants)),
        filter(([item, variantState]) => {
          const variant = this.getVariant(variantState, item.collectionId);
          const entryIndex = variant.entries.findIndex(e => e.entryId === item.entryId);
          return !variant.entries[entryIndex].itemId;
        }),
        map(([item]) => new SelectEquipmentItemAction(item))
      );

  /**
   * If a item gets deleted, it could be the selected one of an antry.
   * So we have to make sure, a new one will be selected
   * @type {Observable<SelectEquipmentItemAction>}
   */
  @Effect()
  selectOtherItemOnDelete: Observable<SelectEquipmentItemAction> =
    this.actions.ofType(EquipmentItemActionTypes.DELETE)
      .pipe(
        tap(() => console.log('selectOtherItemOnDelete start')),
        map(action => (action as AddEquipmentItemAction).payload),
        withLatestFrom(this.store.select(selectEquipmentVariants)),
        filter(([item, variantState]) => {
          const variant = this.getVariant(variantState, item.collectionId);
          const entryIndex = variant.entries.findIndex(e => e.entryId === item.entryId);
          return variant.entries[entryIndex].itemId === item.id;
        }),
        map(([item]) => item.entryId),
        switchMap(entryId => this.store.select(selectEquipmentEntries).pipe(
          map(entries => entries.entities[entryId]),
          filter(entry => !!entry.items.length),
          withLatestFrom(this.store.select(selectEquipmentItems)),
          map(([entry, items]) => items.entities[entry.items[0]])
        )),
        tap(v => console.log('selectOtherItemOnDelete', v)),
        map(item => new SelectEquipmentItemAction(item))
      );

  getVariant(state: EquipmentVariantState, collectionId: string): EquipmentVariant {
    return state.entities[state.selectedVariantIds[collectionId]];
  }

  constructor(private actions: Actions, private store: Store<any>) {
  }
}
