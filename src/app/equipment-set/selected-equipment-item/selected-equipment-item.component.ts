import { EquipmentItem } from '../../shared/models/equipment-item.model';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { EquipmentVariantTotals } from '../../shared/models/equipment-variant.model';

@Component({
  selector: 'equip-selected-equipment-item',
  templateUrl: './selected-equipment-item.component.html',
  styleUrls: ['./selected-equipment-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SelectedEquipmentItemComponent {

  @Input()
  item: EquipmentItem;

  @Input()
  totals: EquipmentVariantTotals;

}
