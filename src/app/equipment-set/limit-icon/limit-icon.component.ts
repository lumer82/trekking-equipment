import { Component, Input } from '@angular/core';
import { EquipmentLimitDefinition, IconType } from '../../shared/models/equipment-limit-definition.model';

@Component({
  selector: 'equip-limit-icon',
  templateUrl: './limit-icon.component.html',
  styleUrls: ['./limit-icon.component.scss']
})
export class LimitIconComponent {
  @Input()
  limit: EquipmentLimitDefinition;

  readonly iconTypes = IconType;
}
