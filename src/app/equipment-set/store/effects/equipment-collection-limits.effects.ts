import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { EquipmentSetFeatureState, selectEquipmentCollections, selectEquipmentSetSettings } from '../equipment-set.reducer';
import { Store } from '@ngrx/store';
import { SetEquipmentCollectionLimitAction } from '../actions/equipment-collection-limits.actions';
import { Observable } from 'rxjs/Observable';
import { concatMap, filter, map, tap, withLatestFrom } from 'rxjs/operators';
import { StoreSelectHelperService } from '../store-select-helper.service';
import { EquipmentSetSettingsActionTypes } from '../actions/equipment-set-settings.actions';
import { EquipmentLimitsActionTypes } from '../actions/equipment-limits.actions';
import { EquipmentCollectionActions, EquipmentCollectionActionTypes } from '../actions/equipment-collection.actions';
import { pipe } from 'rxjs/Rx';

@Injectable()
export class EquipmentCollectionLimitsEffects {

  @Effect()
  updateCollectionLimits$: Observable<SetEquipmentCollectionLimitAction> =
    this.actions.ofType(...Object.values(EquipmentSetSettingsActionTypes), ...Object.values(EquipmentLimitsActionTypes)).pipe(
      tap(() => console.log('starting equpmentset effect')),
      withLatestFrom(this.store.select(selectEquipmentCollections)),
      map(([action, collections]) => collections),
      filter(collections => !!collections.ids.length),
      withLatestFrom(this.store.select(selectEquipmentSetSettings).pipe(map(settings => settings.limits))),
      withLatestFrom(this.storeSelect.getLimitDefinitions()),
      tap(value => console.log('update collection limits', value)),
      map(([[collections, globalLimits], limitDefinitions]) => {
        return (collections.ids as Array<string>).map(id => {
          const collectionLimits = collections.entities[id].limits;
          const limits = limitDefinitions.reduce((setLimits, limitDefinition) => {
                setLimits[limitDefinition.name] =
                  (collectionLimits && collectionLimits[limitDefinition.name])
                  || (globalLimits && globalLimits[limitDefinition.name]);
                return setLimits;
              }, {});
          return { id, limits };
        });
      }),
      concatMap(limits => limits.map(limit => new SetEquipmentCollectionLimitAction(limit)))
    );

  updateSingleCollectionLimit$: Observable<SetEquipmentCollectionLimitAction> =
    this.actions.ofType(EquipmentCollectionActionTypes.ADD).pipe(
      tap(action => console.log('single collection limit effect action', action)),
      filter(action => action.type !== EquipmentCollectionActionTypes.DELETE),
      map(action => (action as EquipmentCollectionActions).payload as {id: string}),
      filter(payload => !!payload.id),
      map(payload => payload.id),
      withLatestFrom(this.store.select(selectEquipmentCollections).pipe(
        withLatestFrom(this.store.select(selectEquipmentSetSettings).pipe(map(settings => settings.limits))),
        withLatestFrom(this.storeSelect.getLimitDefinitions()),
      )),
      tap(value => console.log('update single collection limits', value)),
      // map(([[[id, collections], globalLimits], limitDefinitions]) => {
      //   return (collections.ids as Array<string>).map(id => {
      //     const collectionLimits = collections.entities[id].limits;
      //     const limits = limitDefinitions.reduce((setLimits, limitDefinition) => {
      //       setLimits[limitDefinition.name] =
      //         (collectionLimits && collectionLimits[limitDefinition.name])
      //         || (globalLimits && globalLimits[limitDefinition.name]);
      //       return setLimits;
      //     }, {});
      //     return { id, limits };
      //   });
      // }),
      // concatMap(limits => limits.map(limit => new SetEquipmentCollectionLimitAction(limit)))
      map(() => new SetEquipmentCollectionLimitAction(null))
    );

  // this.setLimits$ = this.store.select(selectEquipmentSetSettings).pipe(
  //   map(settings => settings.limits),
  //   withLatestFrom(this.storeSelect.getLimitDefinitions()),
  //   combineLatest(localLimits$),
  //   map(([[globalLimits, limitDefinitions], collectionLimits]) => limitDefinitions.reduce((setLimits, limitDefinition) => {
  //     setLimits[limitDefinition.name] =
  //       (collectionLimits && collectionLimits[limitDefinition.name])
  //       || (globalLimits && globalLimits[limitDefinition.name]);
  //     return setLimits;
  //   }, {})),
  //   tap(limits => console.log(`limits for collection ${this.collection.name}`, limits))
  // );

  constructor(private actions: Actions,
              private store: Store<EquipmentSetFeatureState>,
              private storeSelect: StoreSelectHelperService) {}
}
