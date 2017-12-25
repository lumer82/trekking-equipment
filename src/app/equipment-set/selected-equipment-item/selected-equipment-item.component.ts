import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators';
import { EquipmentItem } from '../../shared/models/equipment-item.model';
import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { EquipmentLimitDefinition } from '../../shared/models/equipment-limit-definition.model';
import { EquipmentLimits } from '../../shared/models/equipment-limits.model';
import { EquipmentVariantTotals } from '../../shared/models/equipment-variant.model';
import { EquipmentSetFeatureState, selectEquipmentLimits } from '../store/equipment-set.reducer';
import { EquipmentLimitsState } from '../store/reducer/equipment-limits.reducer';

@Component({
  selector: 'equip-selected-equipment-item',
  templateUrl: './selected-equipment-item.component.html',
  styleUrls: ['./selected-equipment-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SelectedEquipmentItemComponent implements OnInit {

  @Input()
  item: EquipmentItem;

  @Input()
  totals: EquipmentVariantTotals;

  @Input()
  showTotals: boolean = true;

  @Input()
  setLimits: { [key: string]: number };

  limits$: Observable<Array<EquipmentLimitDefinition>>;

  constructor(private store: Store<EquipmentSetFeatureState>) {}

  ngOnInit() {
    this.limits$ = this.store.select(selectEquipmentLimits).pipe(
      map(limits => (limits.ids as string[]).map(id => limits.entities[id]))
    );
  }
}
