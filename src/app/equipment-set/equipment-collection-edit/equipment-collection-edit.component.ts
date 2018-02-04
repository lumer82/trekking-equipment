import { Component, Input, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EquipmentCollection } from '../../shared/models/equipment-collection.model';
import { Observable } from 'rxjs/Observable';
import { combineLatest, distinctUntilChanged, filter, map, switchMap, takeUntil, tap, withLatestFrom } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import {
  EquipmentSetFeatureState, selectEquipmentCollections, selectEquipmentEntries, selectEquipmentSetSettings, selectEquipmentVariants,
  selectSelectedVariantIds
} from '../store/equipment-set.reducer';
import { StoreSelectHelperService } from '../store/store-select-helper.service';
import { EquipmentLimitDefinition } from '../../shared/models/equipment-limit-definition.model';
import { EquipmentVariant } from '../../shared/models/equipment-variant.model';
import { debounceTime } from 'rxjs/operators/debounceTime';
import { FormControl } from '@angular/forms';
import { MoveEntryEquipmentVariantAction } from '../store/actions/equipment-variant.actions';
import { EditCollectionLimitsComponent } from '../edit-collection-limits/edit-collection-limits.component';
import { EquipmentTotals } from '../../shared/models/equipment-totals.model';
import {
  DeleteEquipmentCollectionAction, MoveEquipmentCollectionAction,
  UpdateEquipmentCollectionAction
} from '../store/actions/equipment-collection.actions';
import { ReplaySubject } from 'rxjs/ReplaySubject';
import { EquipmentLimits } from '../../shared/models/equipment-limits.model';
import { Subject } from 'rxjs/Subject';
import { AddEquipmentEntryAction } from '../store/actions/equipment-entry.actions';
import { EquipmentEntryState } from '../store/reducer/equipment-entry.reducer';
import { MoveCollectionDialogComponent } from '../move-collection-dialog/move-collection-dialog.component';
import { isNullOrUndefined } from "util";
import { MatDialog } from '@angular/material';
import { EquipmentEntry } from '../../shared/models/equipment-entry.model';

@Component({
  selector: 'equip-equipment-collection-edit',
  templateUrl: './equipment-collection-edit.component.html',
  styleUrls: ['./equipment-collection-edit.component.scss']
})
export class EquipmentCollectionEditComponent implements OnInit, OnDestroy {

  nameForm: FormControl;
  collection$: Observable<EquipmentCollection>;
  collection: EquipmentCollection;
  order$: Observable<number>;
  setId$: Observable<string>;

  totals$: Observable<EquipmentTotals>;
  entries$: Observable<EquipmentEntryState>;

  selectedVariant$: Observable<EquipmentVariant>;
  editMode = true;

  moveMode: { entry: EquipmentEntry, index: number } = null;
  resetEntryEditMode$: Subject<void> = new Subject<void>();
  limitDefinitions$: Observable<Array<EquipmentLimitDefinition>>;

  setLimits$: Observable<EquipmentLimits>;
  private unsubscribe$: Subject<void> = new Subject<void>();

  private collectionLimits$: ReplaySubject<EquipmentLimits> = new ReplaySubject<EquipmentLimits>(1);

  constructor(private store: Store<EquipmentSetFeatureState>,
              private storeSelect: StoreSelectHelperService,
              private matDialog: MatDialog,
              private activatedRoute: ActivatedRoute) {
  }

  ngOnInit() {
    this.setId$ = this.activatedRoute.paramMap.pipe(map(paramMap => paramMap.get('set-id')));

    this.collection$ = this.activatedRoute.data.pipe(map(data => data['collection']));
    this.collection$.pipe(takeUntil(this.unsubscribe$)).subscribe(collection => this.collection = collection);

    this.order$ = this.store.select(selectEquipmentCollections).pipe(
      withLatestFrom(this.collection$.pipe(map(collection => collection.id))),
      map(([collections, collectionId]) => collections.order.findIndex(id => id === collectionId))
    );

    this.totals$ = this.store.select(selectEquipmentCollections).pipe(
      combineLatest(this.collection$.pipe(map(collection => collection.id))),
      map(([collections, id]) => collections.totals[id])
    );

    this.setLimits$ = this.store.select(selectEquipmentSetSettings).pipe(
      map(settings => settings.limits),
      withLatestFrom(this.storeSelect.getLimitDefinitions()),
      combineLatest(this.collection$.pipe(map(collection => collection.limits))),
      map(([[globalLimits, limitDefinitions], collectionLimits]) => limitDefinitions.reduce((setLimits, limitDefinition) => {
        setLimits[limitDefinition.name] =
          (collectionLimits && collectionLimits[limitDefinition.name])
          || (globalLimits && globalLimits[limitDefinition.name]);
        return setLimits;
      }, {}))
    );

    this.nameForm = new FormControl();
    this.nameForm.valueChanges
      .pipe(
        debounceTime(800),
        withLatestFrom(this.collection$.pipe(map(collection => collection.id)))
      )
      .subscribe(([name, id]) =>
        this.store.dispatch(
          new UpdateEquipmentCollectionAction({id, changes: {name}})
        )
      );

    this.limitDefinitions$ = this.storeSelect.getLimitDefinitions();

    this.entries$ = this.store.select(selectEquipmentEntries);
    this.selectedVariant$ = this.store.select(selectSelectedVariantIds).pipe(
      withLatestFrom(this.collection$.pipe(map(collection => collection.id))),
      map(([selectedVariantIds, collectionId]) => selectedVariantIds[collectionId]),
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
    this.moveMode = entry.id !== (this.moveMode && this.moveMode.entry.id) ? {entry, index} : null;
    this.resetEntryEditMode$.next();
  }

  dropTo(index: number): void {
    this.store.dispatch(new MoveEntryEquipmentVariantAction({
      collectionId: this.collection.id,
      entryId: this.moveMode.entry.id,
      moveTo: index
    }));
    this.moveMode = null;
  }

  get moveIndex(): number {
    return this.moveMode ? this.moveMode.index : 0;
  }

  variantEntryId(index: number, variantEntry: { entryId: string }): string {
    return variantEntry.entryId;
  }

  editLimits(): void {
    const dialogRef = this.matDialog.open(EditCollectionLimitsComponent, {data: this.collection.limits});
    dialogRef.afterClosed()
      .pipe(filter(value => !!value))
      .subscribe(value =>
        this.store.dispatch(new UpdateEquipmentCollectionAction({
          id: this.collection.id,
          // check that there are some set limits, else set undefined
          changes: {limits: Object.keys(value).some(k => !!value[k]) ? value : undefined}
        }))
      );
  }

  moveCollection(order: number) {
    const dialogRef = this.matDialog.open(MoveCollectionDialogComponent, {
      data: 0
    });
    dialogRef.afterClosed().pipe(
      filter(result => !isNullOrUndefined(result))
    ).subscribe(result => this.store.dispatch(new MoveEquipmentCollectionAction({id: this.collection.id, moveTo: result})));
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
  }

}
