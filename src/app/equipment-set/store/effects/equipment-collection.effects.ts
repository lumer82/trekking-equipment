import { Injectable } from '@angular/core';
import { Actions } from '@ngrx/effects';
import { CalculateTotalsService } from '../../services/calculate-totals.service';
import { EquipmentSetFeatureState } from '../equipment-set.reducer';
import { Store } from '@ngrx/store';

@Injectable()
export class EquipmentCollectionEffects {



  constructor(private actions$: Actions,
              private store: Store<EquipmentSetFeatureState>,
              private calculateTotalsService: CalculateTotalsService) {}
}
