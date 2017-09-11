import {
  ChangeDetectionStrategy, Component, EventEmitter, forwardRef, HostListener, Input, OnChanges, OnInit,
  Output, SimpleChanges
} from '@angular/core';
import { Entry } from '../../shared/domain/entry';
import { NG_VALUE_ACCESSOR, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { Item } from '../../shared/domain/item';
import { Subscription } from 'rxjs/Subscription';
import { SettingsService } from '../../shared/service/settings.service';
import { Settings } from '../../shared/domain/settings';
import { Observable } from 'rxjs/Observable';
import { getSelectedItem } from '../../shared/util/entry.util';
import { isNullOrUndefined } from 'util';

@Component({
  selector: 'equip-entry',
  templateUrl: 'entry.component.html',
  styleUrls: ['entry.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EntryComponent implements OnInit, OnChanges {

  @Input()
  entry: Entry;

  @Input()
  item: Item;

  @Output()
  entryChange: EventEmitter<Entry> = new EventEmitter();

  @Output()
  addEntry: EventEmitter<Entry> = new EventEmitter();

  @Input()
  selectedId: number;

  @Output()
  readonly selectedIdChange = new EventEmitter<number>();

  @Input()
  new = false;

  @Input()
  acc_price: number;

  @Input()
  acc_weight: number;

  form: FormGroup;

  selectedForm: FormControl;

  newItem = new Item();

  collapsed = true;

  settings$: Observable<Settings>;
  budget_exceeded$: Observable<boolean>;
  weight_exceeded$: Observable<boolean>;

  private valueChangesSubscription: Subscription;

  constructor(private settingsService: SettingsService, private formBuilder: FormBuilder) {
  }

  ngOnInit() {
    this.settings$ = this.settingsService.settings$;
    this.calcExceeded();

    this.form = this.formBuilder.group({
      title: this.entry.title
    });
    this.form.valueChanges.subscribe(value => {
      this.entryChange.emit({...this.entry, ...value});
    });
    this.selectedForm = this.formBuilder.control(this.selectedId);
    this.selectedForm.valueChanges.subscribe(value => {
      this.selectedIdChange.emit(value);
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['entry'] && this.form) {
      const entry = this.entry || { title: '' };
      this.form.setValue({
        title: entry.title
      });
    }
    if (changes['acc_weight'] || changes['acc_price']) {
      this.calcExceeded();
    }
  }

  calcExceeded(): void {
    if (this.settings$) {
      this.budget_exceeded$ = this.settings$.map(settings => !isNullOrUndefined(settings.budget) && settings.budget < this.acc_price);
      this.weight_exceeded$ = this.settings$.map(settings => !isNullOrUndefined(settings.weight) && settings.weight < this.acc_weight);
    }
  }

  getSelectedItem(): Item {
    return getSelectedItem(this.entry, this.selectedId);
  }

  itemChanged(item: Item, index: number): void {
    const items = this.entry.items;
    this.entryChange.emit({...this.entry, items: [...items.slice(0, index), item, ...items.slice(index + 1)]});
  }

  trackById(index: number, item: Item): number {
    return item.id;
  }

  addNewItem(): void {
    const item = this.newItem;
    this.newItem = new Item();
    this.entryChange.emit({...this.entry, items: [...this.entry.items, item]});
  }

  @HostListener('keyup', ['$event'])
  keyup(ev: KeyboardEvent): void {
    if (ev.key === 'Enter' && this.new && this.form.valid) {
      ev.stopPropagation();
      this.addEntry.emit(this.form.value);
      this.form.reset();
    }
  }

}
