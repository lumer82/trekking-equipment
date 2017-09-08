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
  entriesChanged: EventEmitter<Array<Entry>> = new EventEmitter();

  form: FormGroup;

  constructor() { }

  calcCost(index: number): number {
      return this.calc(index, e => getSelectedItem(e).cost);
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

  entryChanged(entry: Entry, index: number): void {
    this.entriesChanged.emit([...this.entries.slice(0, index), entry, ...this.entries.slice(index + 1)]);
  }

  trackByTitle(index: number, entry: Entry): string {
    return entry.title;
  }
}
