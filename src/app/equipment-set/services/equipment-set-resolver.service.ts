import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { EquipmentSet } from '../../../shared/models/equipment-set.model';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class EquipmentSetResolver implements Resolve<EquipmentSet> {

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): EquipmentSet | Observable<EquipmentSet> | Promise<EquipmentSet> {
    const setId = route.paramMap.get('set-id');
    if (setId === 'new') {
      return {
        name: 'New'
      };
    }
    throw new Error('Method not implemented.');
  }

  constructor() { }

}
