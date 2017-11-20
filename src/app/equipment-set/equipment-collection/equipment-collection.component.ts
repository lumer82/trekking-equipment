import { EquipmentCollection } from './../../shared/models/equipment-collection.model';
import { Component, OnInit, Input, ChangeDetectionStrategy } from '@angular/core';
import { Store } from '@ngrx/store';
import { DeleteEquipmentCollectionAction, UpdateEquipmentCollectionAction } from '../store/actions/equipment-collection.actions';
import { FormControl } from '@angular/forms';
import { debounceTime } from 'rxjs/operators/debounceTime';

@Component({
  selector: 'equip-equipment-collection',
  templateUrl: './equipment-collection.component.html',
  styleUrls: ['./equipment-collection.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EquipmentCollectionComponent implements OnInit {

  nameForm: FormControl;

  @Input()
  collection: EquipmentCollection;

  constructor(private store: Store<any>) { }

  ngOnInit() {
    console.log('OnInit for id', this.collection.id);
    this.nameForm = new FormControl();
    this.nameForm.valueChanges
      .pipe(
        debounceTime(800)
      )
      .subscribe(name => this.store.dispatch(new UpdateEquipmentCollectionAction({...this.collection, name})));
  }

  delete(): void {
    this.store.dispatch(new DeleteEquipmentCollectionAction(this.collection));
  }

  addEntry(): void {

  }

}
