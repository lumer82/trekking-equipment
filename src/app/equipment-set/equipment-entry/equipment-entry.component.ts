import { AddEquipmentItemAction } from './../store/actions/equipment-item.actions';
import { selectEquipmentItems } from './../store/equipment-set.reducer';
import { UpdateEquipmentEntryAction } from './../store/actions/equipment-entry.actions';
import { debounceTime } from 'rxjs/operators/debounceTime';
import { EquipmentCollection } from './../../shared/models/equipment-collection.model';
import { Store } from '@ngrx/store';
import { EquipmentEntry } from './../../shared/models/equipment-entry.model';
import { Component, OnInit, Input } from '@angular/core';
import { EquipmentSetState } from '../store/equipment-set.reducer';
import { DeleteEquipmentEntryAction } from '../store/actions/equipment-entry.actions';
import { FormControl } from '@angular/forms';
import { EquipmentItemState } from '../store/reducer/equipment-item.reducer';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'equip-equipment-entry',
  templateUrl: './equipment-entry.component.html',
  styleUrls: ['./equipment-entry.component.scss']
})
export class EquipmentEntryComponent implements OnInit {

  nameForm: FormControl;

  @Input()
  entry: EquipmentEntry;

  @Input()
  collection: EquipmentCollection;

  items$: Observable<EquipmentItemState>;

  constructor(private store: Store<{ equipmentSet: EquipmentSetState }>) { }

  ngOnInit() {
    this.nameForm = new FormControl();
    this.nameForm.valueChanges
      .pipe(
        debounceTime(800)
      )
      .subscribe(name => this.store.dispatch(new UpdateEquipmentEntryAction({...this.entry, name})));


      this.items$ = this.store.select(selectEquipmentItems);
  }

  delete(): void {
    this.store.dispatch(new DeleteEquipmentEntryAction(this.entry));
  }

  addItem(): void {
    this.store.dispatch(
      new AddEquipmentItemAction({
        id: Date.now().toString(),
        name: 'New Item',
        collectionId: this.collection.id,
        entryId: this.entry.id
      })
    );
  }

}
