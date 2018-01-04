import { ChangeDetectionStrategy, Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { EquipmentLimitDefinition, LimitType } from '../../shared/models/equipment-limit-definition.model';
import { StoreSelectHelperService } from '../store/store-select-helper.service';
import { EquipmentTotals } from '../../shared/models/equipment-totals.model';

@Component({
  selector: 'equip-equipment-totals',
  templateUrl: './equipment-totals.component.html',
  styleUrls: ['./equipment-totals.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EquipmentTotalsComponent implements OnChanges {
  limitDefinitions$: Observable<Array<EquipmentLimitDefinition>>;

  @Input()
  setLimits: { [limit: string]: number };

  @Input()
  values: { [limit: string]: number };

  @Input()
  totals: { [limit: string]: number };

  @Input()
  startValues: EquipmentTotals;

  @Input()
  showTotals = true;

  @Input()
  limitDefinitions: Array<EquipmentLimitDefinition>

  calculatedTotals: EquipmentTotals;

  constructor(private storeSelect: StoreSelectHelperService) {
    this.limitDefinitions$ = this.storeSelect.getLimitDefinitions();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (!(changes['totals'] || changes['startValues'] || changes['limitDefinitions'])) {
      return;
    }

    this.calculatedTotals = this.startValues ? Object.keys(this.totals).reduce((calc, key) => {
      calc[key] = this.totals[key] + (this.isGlobal(key) ? this.startValues[key] || 0 : 0);
      return calc;
    }, {}) : this.totals;
  }

  private isGlobal(key: string): boolean {
    return this.limitDefinitions && this.limitDefinitions.find(ld => ld.name === key).type === LimitType.GLOBAL;
  }

  /**
   * this method is a tradeoff between complexity and needed time to implement a more efficient
   * computational method at changeDetection and just recalculate it for every changeDetection occurs.
   * There should not be so many limits, so even if a changeDetection Cycle
   * is run over this method, the needed computation time can be ignored.
   * The complexity of implementing the correct onChanges logic is to complex
   * and would save next to nothing on computational time
   *
   * @param {EquipmentLimitDefinition} limit
   * @returns {boolean}
   */
  showWarning(limit: EquipmentLimitDefinition): boolean {
    return this.showTotals
      && this.calculatedTotals
      && this.setLimits
      && this.isBiggerThanSetLimit(this.calculatedTotals[limit.name], this.setLimits[limit.name]);
  }

  isBiggerThanSetLimit(total: number, setLimit: number): boolean {
    return total && setLimit && total > setLimit;
  }
}
