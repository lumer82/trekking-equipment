import { ChangeDetectionStrategy, ChangeDetectorRef, Component, forwardRef, Input, OnInit } from '@angular/core';
import { Entry } from '../../shared/domain/entry';
import { ControlValueAccessor, FormBuilder, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'equip-entries',
  templateUrl: './entries.component.html',
  styleUrls: ['./entries.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => EntriesComponent),
      multi: true
    }
  ]
})
export class EntriesComponent implements OnInit, ControlValueAccessor {

  @Input()
  entries: Array<Entry>;

  constructor(private formBuilder: FormBuilder, private changeDetectorRef: ChangeDetectorRef) { }

  ngOnInit() {
  }

  calcCost(index: number): number {
      return this.calc(index, e => e.selectedItem.cost);
  }

  calcWeight(index: number): number {
    return this.calc(index, e => e.selectedItem.weight);
  }

  private calc(index, selector: (entry) => number): number {
    return this.entries
      .slice(0, index)
      .filter(e => !!e.selectedItem)
      .map(selector)
      .reduce((a, b) => a + b, 0);
  }


  writeValue(entries: Array<Entry>): void {
    this.entries = entries;
  }

  propagateChange = (_: any) => {};
  propagateTouch = (_: any) => {};

  registerOnChange(fn: any): void {
    this.propagateChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.propagateTouch = fn;
  }


}
