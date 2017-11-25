import { UpdateEquipmentItemAction } from './../store/actions/equipment-item.actions';
import { debounceTime } from 'rxjs/operators/debounceTime';
import { FormControl } from '@angular/forms';
import { Store } from '@ngrx/store';
import { EquipmentItem } from './../../shared/models/equipment-item.model';
import { EquipmentEntry } from './../../shared/models/equipment-entry.model';
import { Component, OnInit, Input } from '@angular/core';
import { EquipmentCollection } from '../../shared/models/equipment-collection.model';
import { DeleteEquipmentItemAction } from '../store/actions/equipment-item.actions';
import { EquipmentSetState } from '../store/equipment-set.reducer';

@Component({
  selector: 'equip-equipment-item',
  templateUrl: './equipment-item.component.html',
  styleUrls: ['./equipment-item.component.scss']
})
export class EquipmentItemComponent implements OnInit {

  nameForm: FormControl;

  @Input()
  item: EquipmentItem;

  @Input()
  entry: EquipmentEntry;

  @Input()
  collection: EquipmentCollection;

  constructor(private store: Store<{ equipmentSet: EquipmentSetState }>) { }

  ngOnInit() {
    this.nameForm = new FormControl();
    this.nameForm.valueChanges
      .pipe(
        debounceTime(800)
      )
      .subscribe(name => this.store.dispatch(new UpdateEquipmentItemAction({...this.item, name})));
  }

  delete(): void {
    this.store.dispatch(new DeleteEquipmentItemAction(this.item));
  }

}
