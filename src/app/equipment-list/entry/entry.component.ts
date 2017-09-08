import {
  ChangeDetectionStrategy, Component, EventEmitter, forwardRef, Input, OnChanges, OnInit,
  Output, SimpleChanges
} from '@angular/core';
import { Entry } from '../../shared/domain/entry';
import { NG_VALUE_ACCESSOR, FormBuilder, FormGroup } from '@angular/forms';
import { Item } from '../../shared/domain/item';
import { Subscription } from 'rxjs/Subscription';
import { SettingsService } from '../../shared/service/settings.service';
import { Settings } from '../../shared/domain/settings';
import { Observable } from 'rxjs/Observable';
import { getSelectedItem } from '../../shared/util/entry.util';

@Component({
  selector: 'equip-entry',
  templateUrl: 'entry.component.html',
  styleUrls: ['entry.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EntryComponent implements OnInit, OnChanges {

  @Input()
  entry: Entry;

  @Output()
  entryChanged: EventEmitter<Entry> = new EventEmitter();

  @Input()
  acc_cost: number;

  @Input()
  acc_weight: number;

  form: FormGroup;

  newItem = new Item();

  collapsed = true;

  settings$: Observable<Settings>;
  budget_exceeded$: Observable<boolean>;
  weight_exceeded$: Observable<boolean>;

  private valueChangesSubscription: Subscription;

  constructor(private settingsService: SettingsService, private formBuilder: FormBuilder) {}

  ngOnInit() {
    this.settings$ = this.settingsService.settings$.do(settings => console.log('getting settings', settings));
    this.calcExceeded();

    this.form = this.formBuilder.group({
      title: this.entry.title,
      selectedItemId: this.entry.selectedItemId
    });
    this.form.valueChanges.subscribe(value => {
      this.entryChanged.emit({...this.entry, ...value});
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.form) {
      this.form.setValue({
        title: this.entry.title,
        selectedItemId: this.entry.selectedItemId
      });
    }
    this.calcExceeded();
  }

  calcExceeded(): void {
    if (this.settings$) {
      this.budget_exceeded$ = this.settings$.map(settings => settings.budget < (this.acc_cost + this.getSelectedItem().cost));
      this.weight_exceeded$ = this.settings$.map(settings => settings.weight < (this.acc_weight + this.getSelectedItem().weight));
    }
  }

  getSelectedItem(): Item {
    return getSelectedItem(this.entry);
  }

  itemChanged(item: Item, index: number): void {
    const items = this.entry.items;
    this.entryChanged.emit({...this.entry, items: [...items.slice(0, index), item, ...items.slice(index + 1)]});
  }

  trackById(index: number, item: Item): number {
    return item.id;
  }

}
