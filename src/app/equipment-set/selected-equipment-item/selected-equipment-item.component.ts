import { EquipmentItem } from './../../shared/models/equipment-item.model';
import { Component, OnInit, Input, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'equip-selected-equipment-item',
  templateUrl: './selected-equipment-item.component.html',
  styleUrls: ['./selected-equipment-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SelectedEquipmentItemComponent {

  @Input()
  item: EquipmentItem;

}
