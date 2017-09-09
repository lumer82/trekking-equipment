import {
  ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, forwardRef, Input, OnInit,
  Output
} from '@angular/core';
import { Entry } from '../../shared/domain/entry';
import { ControlValueAccessor, FormArray, FormBuilder, FormGroup, NG_VALUE_ACCESSOR } from '@angular/forms';
import { getSelectedItem } from '../../shared/util/entry.util';

@Component({
  selector: 'equip-entries',
  templateUrl: './entries.component.html',
  styleUrls: ['./entries.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EntriesComponent {

  @Input()
  entries: Array<Entry>;

  @Output()
  entriesChange: EventEmitter<Array<Entry>> = new EventEmitter();

  newEntry = new Entry();

  form: FormGroup;

  constructor() { }

  calcCost(index: number): number {
      return this.calc(index, e => getSelectedItem(e).price);
  }

  calcWeight(index: number): number {
    return this.calc(index, e => getSelectedItem(e).weight);
  }

  private calc(index, selector: (entry) => number): number {
    return this.entries
      .slice(0, index)
      .filter(e => !!e.selectedItemId)
      .map(selector)
      .reduce((a, b) => a + b, 0);
  }

  entryChange(entry: Entry, index: number): void {
    this.entriesChange.emit([...this.entries.slice(0, index), entry, ...this.entries.slice(index + 1)]);
  }

  trackByTitle(index: number, entry: Entry): string {
    return entry.title;
  }

  addEntry(): void {
    console.log(this.newEntry);
    const entry = this.newEntry;
    this.newEntry = new Entry();
    this.entriesChange.emit([...this.entries, entry]);
  }
}
