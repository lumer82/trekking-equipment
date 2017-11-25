import { EquipmentItem } from './../../shared/models/equipment-item.model';
import { AddEquipmentItemAction, SelectEquipmentItemAction } from './../store/actions/equipment-item.actions';
import { selectEquipmentItems, selectSelectedVariantId, selectEquipmentVariants } from './../store/equipment-set.reducer';
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
import { OnChanges, SimpleChanges } from '@angular/core/src/metadata/lifecycle_hooks';
import { switchMap } from 'rxjs/operators/switchMap';
import { map } from 'rxjs/operators/map';
import { filter } from 'rxjs/operators/filter';

@Component({
  selector: 'equip-equipment-entry',
  templateUrl: './equipment-entry.component.html',
  styleUrls: ['./equipment-entry.component.scss']
})
export class EquipmentEntryComponent implements OnInit, OnChanges {

  nameForm: FormControl;

  @Input()
  entry: EquipmentEntry;

  @Input()
  collection: EquipmentCollection;

  @Input()
  collectionEdit: boolean;

  editMode = false;

  items$: Observable<EquipmentItemState>;

  selectedItem$: Observable<EquipmentItem>;

  constructor(private store: Store<{ equipmentSet: EquipmentSetState }>) { }

  ngOnInit() {
    this.nameForm = new FormControl();
    this.nameForm.valueChanges
      .pipe(
        debounceTime(800)
      )
      .subscribe(name => this.store.dispatch(new UpdateEquipmentEntryAction({...this.entry, name})));


      this.items$ = this.store.select(selectEquipmentItems);
      this.selectedItem$ = this.store.select(selectSelectedVariantId).pipe(
        switchMap(selectedVariantId => this.store.select(selectEquipmentVariants).pipe(
          map(variants => variants.entities[selectedVariantId])
        )),
        map(variant => variant.selectedItems[this.entry.id]),
        switchMap(selectedItemId => this.store.select(selectEquipmentItems).pipe(
          map(items => items.entities[selectedItemId])
        ))
      );
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['collectionEdit']) {
      this.editMode = this.editMode && changes['collectionEdit'].currentValue;
    }
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

  selectItem(item: EquipmentItem): void {
    if (!!item) {
      this.store.dispatch(new SelectEquipmentItemAction(item));
    }
  }

}
