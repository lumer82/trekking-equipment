import { EquipmentEntry } from '../../shared/models/equipment-entry.model';
import { EquipmentEntryState } from '../store/reducer/equipment-entry.reducer';
import { EquipmentCollection } from '../../shared/models/equipment-collection.model';
import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { animate, style, transition, trigger } from '@angular/animations';
import { Store } from '@ngrx/store';
import { DeleteEquipmentCollectionAction, UpdateEquipmentCollectionAction } from '../store/actions/equipment-collection.actions';
import { FormControl } from '@angular/forms';
import { debounceTime } from 'rxjs/operators/debounceTime';
import {
  EquipmentSetState,
  selectEquipmentEntries,
  selectEquipmentVariants,
  selectSelectedVariantIds
} from '../store/equipment-set.reducer';
import { Observable } from 'rxjs/Observable';
import { AddEquipmentEntryAction } from '../store/actions/equipment-entry.actions';
import { Subject } from 'rxjs/Subject';
import { EquipmentVariant } from '../../shared/models/equipment-variant.model';
import { map, switchMap } from 'rxjs/operators';
import { MoveEntryEquipmentVariantAction } from '../store/actions/equipment-variant.actions';

@Component({
  selector: 'equip-equipment-collection',
  templateUrl: './equipment-collection.component.html',
  styleUrls: ['./equipment-collection.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    trigger('move', [
      transition(':enter', [
        style({ height: '0px' }),
        animate(25, style({height: '*'}))
      ]),
      transition(':leave', [
        style({ height: '*' }),
        animate(25, style({height: '0px'}))
      ]),
    ])
  ]
})
export class EquipmentCollectionComponent implements OnInit {
  nameForm: FormControl;

  @Input() collection: EquipmentCollection;

  entries$: Observable<EquipmentEntryState>;
  selectedVariant$: Observable<EquipmentVariant>;

  editMode = true;
  moveMode: { entry: EquipmentEntry, index: number } = null;
  resetEntryEditMode$: Subject<void> = new Subject<void>();

  constructor(private store: Store<{ equipmentSet: EquipmentSetState }>) {}

  ngOnInit() {
    console.log('OnInit for id', this.collection.id);
    this.nameForm = new FormControl();
    this.nameForm.valueChanges
      .pipe(debounceTime(800))
      .subscribe(name =>
        this.store.dispatch(
          new UpdateEquipmentCollectionAction({ ...this.collection, name })
        )
      );

    this.entries$ = this.store.select(selectEquipmentEntries);
    this.selectedVariant$ = this.store.select(selectSelectedVariantIds).pipe(
      map(selectedVariantIds => selectedVariantIds[this.collection.id]),
      switchMap((variantId: string) => this.store.select(selectEquipmentVariants).pipe(
        map(variants => variants.entities[variantId]))
      )
    );
  }

  delete(): void {
    this.store.dispatch(new DeleteEquipmentCollectionAction(this.collection));
  }

  addEntry(input: HTMLInputElement): void {
    if (!input.value) {
      return;
    }

    this.store.dispatch(
      new AddEquipmentEntryAction({
        id: Date.now().toString(),
        name: input.value,
        collectionId: this.collection.id,
        items: []
      })
    );

    input.value = null;
  }

  toggleEditMode(): void {
    this.editMode = !this.editMode;
    this.moveMode = this.editMode && this.moveMode;
  }

  move(entry: EquipmentEntry, index: number): void {
    this.moveMode = entry.id !== (this.moveMode && this.moveMode.entry.id) ? { entry, index } : null;
    this.resetEntryEditMode$.next();
  }

  dropTo(index: number): void {
    this.store.dispatch(new MoveEntryEquipmentVariantAction({
      collectionId: this.collection.id,
      entryId: this.moveMode.entry.id,
      moveTo: index }));
    this.moveMode = null;
  }

  get moveIndex(): number {
    return this.moveMode ? this.moveMode.index : 0;
  }

  variantEntryId(index: number, variantEntry: { entryId: string}): string {
    return variantEntry.entryId;
  }
}
