import { Component, Input } from '@angular/core';
import { EquipmentLimit, IconType } from '../../shared/models/equipment-limit.model';

@Component({
  selector: 'equip-limit-icon',
  templateUrl: './limit-icon.component.html',
  styleUrls: ['./limit-icon.component.scss']
})
export class LimitIconComponent {
  @Input()
  limit: EquipmentLimit;

  readonly iconTypes = IconType;
}
