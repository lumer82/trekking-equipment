import { DeleteEquipmentEntryAction } from './../actions/equipment-entry.actions';
import { EquipmentCollectionActionTypes, DeleteEquipmentCollectionAction } from './../actions/equipment-collection.actions';
import { Action } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { filter, map, mergeMap } from 'rxjs/operators';

@Injectable()
export class EquipmentCollectionEffects {

  @Effect() deleteCollection$: Observable<Action> =
    this.actions$.ofType(EquipmentCollectionActionTypes.DELETE)
      .pipe(
        map(action => (action as DeleteEquipmentCollectionAction).payload),
        filter(collection => collection.entries && collection.entries.length > 0),
        mergeMap(collection => collection.entries.map(entry => new DeleteEquipmentEntryAction({ collection, entry})))
      );

  constructor(private actions$: Actions) {}
}
