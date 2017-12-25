import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { EquipmentLimitDefinition } from '../../shared/models/equipment-limit-definition.model';

@Component({
  selector: 'equip-limits-view',
  templateUrl: './limits-view.component.html',
  styleUrls: ['./limits-view.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LimitsViewComponent {

  @Input()
  limitDefinitions: Array<EquipmentLimitDefinition>;

  @Input()
  limits: { [key: string]: number };

}
