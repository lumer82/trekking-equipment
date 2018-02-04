import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot } from '@angular/router';
import { EquipmentCollection } from '../../shared/models/equipment-collection.model';
import { Observable } from 'rxjs/Observable';
import { EquipmentSetFeatureState, selectEquipmentCollections } from '../store/equipment-set.reducer';
import { Store } from '@ngrx/store';
import { map, shareReplay, take, tap } from 'rxjs/operators';
import { Location } from '@angular/common';

@Injectable()
export class EditCollectionResolver implements Resolve<EquipmentCollection> {

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<EquipmentCollection> {

    const id = route.paramMap.get('collection-id');
    console.log('router param map', id);
    return this.store.select(selectEquipmentCollections).pipe(
      take(1),
      map(collections => {
        const collection = collections.entities[id]
        if (collection) {
          return collection;
        } else {
          this.router.navigate(['/equipment-set', route.paramMap.get('set-id')]);
          return null;
        }
      })
    );
  }

  constructor(private store: Store<EquipmentSetFeatureState>, private router: Router) { }

}
