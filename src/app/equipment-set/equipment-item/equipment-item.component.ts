import { UpdateEquipmentItemAction } from './../store/actions/equipment-item.actions';
import { debounceTime } from 'rxjs/operators/debounceTime';
import { FormControl, FormGroup, FormBuilder } from '@angular/forms';
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

  form: FormGroup;

  @Input()
  item: EquipmentItem;

  @Input()
  entry: EquipmentEntry;

  @Input()
  collection: EquipmentCollection;

  constructor(private store: Store<{ equipmentSet: EquipmentSetState }>, private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.form = this.formBuilder.group({
      name: this.item.name,
      price: this.item.price,
      weight: this.item.weight,
      volume: this.item.volume
    });
    this.form.valueChanges
      .pipe(
        debounceTime(800)
      )
      .subscribe(values => this.store.dispatch(new UpdateEquipmentItemAction({...this.item, ...values})));
  }

  delete(): void {
    this.store.dispatch(new DeleteEquipmentItemAction(this.item));
  }

}
