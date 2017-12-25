import { tap, withLatestFrom } from 'rxjs/operators';
import { EquipmentItem } from '../../shared/models/equipment-item.model';
import { EquipmentLimits } from '../../shared/models/equipment-limits.model';
import {
  AddEquipmentItemAction, DeleteEquipmentItemAction, SelectEquipmentItemAction,
  UpdateEquipmentItemAction
} from '../store/actions/equipment-item.actions';
import {
  EquipmentSetFeatureState, EquipmentSetState, selectEquipmentItems,
  selectEquipmentSetSettings
} from '../store/equipment-set.reducer';
import { DeleteEquipmentEntryAction, UpdateEquipmentEntryAction } from '../store/actions/equipment-entry.actions';
import { debounceTime } from 'rxjs/operators/debounceTime';
import { EquipmentCollection } from '../../shared/models/equipment-collection.model';
import { Store } from '@ngrx/store';
import { EquipmentEntry } from '../../shared/models/equipment-entry.model';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { EquipmentItemState } from '../store/reducer/equipment-item.reducer';
import { Observable } from 'rxjs/Observable';
import { OnChanges, SimpleChanges } from '@angular/core/src/metadata/lifecycle_hooks';
import { map } from 'rxjs/operators/map';
import { EquipmentVariantTotals } from '../../shared/models/equipment-variant.model';
import { MatDialog } from '@angular/material';
import { EditEquipmentItemComponent } from '../edit-equipment-item/edit-equipment-item.component';
import { StoreSelectHelperService } from '../store/store-select-helper.service';

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
  selectedItemId: string;

  @Input()
  editMode: boolean;

  @Input()
  moving;

  @Input()
  totals: EquipmentVariantTotals;

  @Output()
  move: EventEmitter<void> = new EventEmitter<void>();

  items$: Observable<EquipmentItemState>;

  selectedItem$: Observable<EquipmentItem>;
  setLimits$: Observable<EquipmentLimits>;

  constructor(private store: Store<EquipmentSetFeatureState>,
              private storeSelect: StoreSelectHelperService,
              private matDialog: MatDialog) {
  }

  ngOnInit() {
    this.nameForm = new FormControl();
    this.nameForm.valueChanges
      .pipe(
        debounceTime(800)
      )
      .subscribe(name => this.store.dispatch(new UpdateEquipmentEntryAction({...this.entry, name})));

    this.setLimits$ = this.store.select(selectEquipmentSetSettings).pipe(
      map(settings => settings.limits),
      withLatestFrom(this.storeSelect.getLimitDefinitions()),
      map(([globalLimits, limitDefinitions]) => limitDefinitions.reduce((setLimits, limitDefinition) => {
        setLimits[limitDefinition.name] =
          (this.collection.limits && this.collection.limits[limitDefinition.name])
          || (globalLimits && globalLimits[limitDefinition.name]);
        return setLimits;
      }, {}))
    );

    this.items$ = this.store.select(selectEquipmentItems);
    this.selectedItem$ = this.store.select(selectEquipmentItems).pipe(
      map(items => items.entities[this.selectedItemId])
    );
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['collectionEdit']) {
      this.editMode = this.editMode && changes['collectionEdit'].currentValue;
    }
    if (changes['moving']) {
      this.editMode = this.editMode && !changes['moving'].currentValue;
    }
    if (changes['selectedItemId']) {
      this.selectedItem$ = this.store.select(selectEquipmentItems).pipe(
        map(items => items.entities[changes['selectedItemId'].currentValue])
      );
    }
  }

  delete(): void {
    this.store.dispatch(new DeleteEquipmentEntryAction(this.entry));
  }

  selectItem(item: EquipmentItem): void {
    if (!!item) {
      this.store.dispatch(new SelectEquipmentItemAction(item));
    }
  }

  doMove(): void {
    this.move.emit();
  }

  editItem(item: EquipmentItem): void {
    this.editItemDialog(item, resultItem => this.store.dispatch(new UpdateEquipmentItemAction({...item, ...resultItem})));
  }

  deleteItem(item: EquipmentItem): void {
    this.store.dispatch(new DeleteEquipmentItemAction(item));
  }

  newItem(input: HTMLInputElement, ev: Event): void {
    if (!input.value) {
      return;
    }
    const item = {
      name: input.value,
      id: Date.now().toString(),
      collectionId: this.collection.id,
      entryId: this.entry.id
    };
    input.value = null;
    this.editItemDialog(item, resultItem => this.store.dispatch(new AddEquipmentItemAction({...item, ...resultItem})));
  }

  private editItemDialog(item: EquipmentItem, resultAction: (resultItem: EquipmentItem) => void): void {
    const dialogRef = this.matDialog.open(EditEquipmentItemComponent, {data: item});
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        resultAction(result);
      }
    });
  }

}
