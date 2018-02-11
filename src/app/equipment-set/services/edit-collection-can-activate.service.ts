import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { EquipmentSetFeatureState, selectEquipmentCollections } from '../store/equipment-set.reducer';
import { Store } from '@ngrx/store';
import { map, take } from 'rxjs/operators';

@Injectable()
export class EditCollectionCanActivateService implements CanActivate {
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    const id = route.paramMap.get('collection-id');
    return this.store.select(selectEquipmentCollections).pipe(
      take(1),
      map(collections => {
        const collection = collections.entities[id]
        if (collection) {
          return true;
        } else {
          this.router.navigate(['/equipment-set', route.paramMap.get('set-id')]);
          return false;
        }
      })
    );
  }

  constructor(private store: Store<EquipmentSetFeatureState>, private router: Router) { }

}
