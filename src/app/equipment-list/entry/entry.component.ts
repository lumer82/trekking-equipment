import { ChangeDetectionStrategy, ChangeDetectorRef, Component, forwardRef, Input, OnInit } from '@angular/core';
import { Entry } from '../../shared/domain/entry';
import { ControlValueAccessor, FormArray, FormBuilder, FormGroup, NG_VALUE_ACCESSOR } from '@angular/forms';
import { Item } from '../../shared/domain/item';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'equip-entry',
  templateUrl: 'entry.component.html',
  styleUrls: ['entry.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => EditEntryComponent),
      multi: true
    }
  ]
})
export class EditEntryComponent implements OnInit, ControlValueAccessor {

  @Input()
  entry: Entry;

  collapsed = true;

  @Input()
  form: FormGroup;

  private valueChangesSubscription: Subscription;

  constructor(private formBuilder: FormBuilder,
              private changeDetectorRef: ChangeDetectorRef) { }

  ngOnInit() {
    // console.log('this.form', this.form.get('items'));
    // this.form.patchValue({
    //   items: this.formBuilder.array(this.form.get('items').value || [])
    // });
    // console.log('this.form after patch', this.form.get('items'));
    // this.initForm();
  }

  initForm() {
    const entry = this.entry || new Entry();

    if (this.valueChangesSubscription) {
      this.valueChangesSubscription.unsubscribe();
    }

    entry.items = [];
    console.log('entry.items', entry);

    this.form = this.formBuilder.group({
      title: entry.title,
      items: this.formBuilder.array(entry.items),
      selectedItem: entry.selectedItem
    });

    this.valueChangesSubscription = this.form.valueChanges.subscribe(form => {
      console.log('form changes', form);
      this.changeDetectorRef.detectChanges();
      this.propagateChange(form);
    });
  }

  propagateChange = (_: any) => {};
  propagateTouch = (_: any) => {};

  writeValue(entry: Entry): void {
    console.log('write entry', entry);
    this.entry = entry;
  }

  registerOnChange(fn: any): void {
    console.log('entry registerOnChange', fn);
    this.propagateChange = fn;
  }

  registerOnTouched(fn: any): void {
    console.log('entry registerOnTouched', fn);
    this.propagateTouch = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    throw new Error('Method not implemented.');
  }

  get items(): FormArray {
    return this.form.get('items') as FormArray;
  }

  addItem(): void {
    this.items.push(this.formBuilder.group(new Item()));
  }

}
