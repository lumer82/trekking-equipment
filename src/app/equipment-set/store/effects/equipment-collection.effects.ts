import { DeleteEquipmentEntryAction } from './../actions/equipment-entry.actions';
import { EquipmentCollectionActionTypes, DeleteEquipmentCollectionAction } from './../actions/equipment-collection.actions';
import { Action } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { filter, map, mergeMap } from 'rxjs/operators';

@Injectable()
export class EquipmentCollectionEffects {
  constructor(private actions$: Actions) {}
}
