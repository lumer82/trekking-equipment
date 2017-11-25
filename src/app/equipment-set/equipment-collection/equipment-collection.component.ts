import { EquipmentEntry } from './../../shared/models/equipment-entry.model';
import { EquipmentEntryState } from './../store/reducer/equipment-entry.reducer';
import { EquipmentCollection } from './../../shared/models/equipment-collection.model';
import {
  Component,
  OnInit,
  Input,
  ChangeDetectionStrategy
} from '@angular/core';
import {
  trigger,
  transition,
  style,
  animate
} from '@angular/animations';
import { Store } from '@ngrx/store';
import {
  DeleteEquipmentCollectionAction,
  UpdateEquipmentCollectionAction
} from '../store/actions/equipment-collection.actions';
import { FormControl } from '@angular/forms';
import { debounceTime } from 'rxjs/operators/debounceTime';
import {
  EquipmentSetState,
  selectEquipmentEntries
} from '../store/equipment-set.reducer';
import { Observable } from 'rxjs/Observable';
import { AddEquipmentEntryAction } from '../store/actions/equipment-entry.actions';
import { Subject } from 'rxjs/Subject';

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

  editMode = false;
  moveMode: EquipmentEntry = null;
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
  }

  delete(): void {
    this.store.dispatch(new DeleteEquipmentCollectionAction(this.collection));
  }

  addEntry(): void {
    this.store.dispatch(
      new AddEquipmentEntryAction({
        id: Date.now().toString(),
        name: 'New Entry',
        collectionId: this.collection.id,
        items: []
      })
    );
  }

  toggleEditMode(): void {
    this.editMode = !this.editMode;
    this.moveMode = this.editMode && this.moveMode;
  }

  move(entry: EquipmentEntry): void {
    this.moveMode = entry !== this.moveMode ? entry : null;
    this.resetEntryEditMode$.next();
  }

  dropTo(index: number): void {
    const filter = (id: string) => id !== this.moveMode.id;
    const oldEntries = this.collection.entries.filter(filter);
    const entries = [
      ...oldEntries.slice(0, index),
      this.moveMode.id,
      ...oldEntries.slice(index)
    ];
    this.moveMode = null;
    this.store.dispatch(new UpdateEquipmentCollectionAction({ ...this.collection, entries }));
  }

  get moveIndex(): number {
    return this.moveMode ? this.collection.entries.findIndex(e => e === this.moveMode.id) : 0;
  }
}
