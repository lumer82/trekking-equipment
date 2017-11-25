import { EquipmentCollection } from './../../shared/models/equipment-collection.model';
import { Store } from '@ngrx/store';
import { EquipmentEntry } from './../../shared/models/equipment-entry.model';
import { Component, OnInit, Input } from '@angular/core';
import { EquipmentSetState } from '../store/equipment-set.reducer';
import { DeleteEquipmentEntryAction } from '../store/actions/equipment-entry.actions';

@Component({
  selector: 'equip-equipment-entry',
  templateUrl: './equipment-entry.component.html',
  styleUrls: ['./equipment-entry.component.scss']
})
export class EquipmentEntryComponent implements OnInit {

  @Input()
  entry: EquipmentEntry;

  @Input()
  collection: EquipmentCollection;

  constructor(private store: Store<{ equipmentSet: EquipmentSetState }>) { }

  ngOnInit() {
  }

  delete(): void {
    this.store.dispatch(new DeleteEquipmentEntryAction(this.entry));
  }

}
