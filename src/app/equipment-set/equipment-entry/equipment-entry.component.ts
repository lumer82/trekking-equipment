import { EquipmentEntry } from './../../shared/models/equipment-entry.model';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'equip-equipment-entry',
  templateUrl: './equipment-entry.component.html',
  styleUrls: ['./equipment-entry.component.scss']
})
export class EquipmentEntryComponent implements OnInit {

  @Input()
  entry: EquipmentEntry;

  constructor() { }

  ngOnInit() {
  }

}
