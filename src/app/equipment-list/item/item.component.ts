import { ChangeDetectionStrategy, Component, forwardRef, Input, OnInit } from '@angular/core';
import { ControlValueAccessor, FormBuilder, FormGroup, NG_VALUE_ACCESSOR } from '@angular/forms';
import { Item } from '../../shared/domain/item';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'equip-item',
  templateUrl: 'item.component.html',
  styleUrls: ['item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => ItemComponent),
      multi: true
    }
  ]
})
export class ItemComponent implements OnInit, ControlValueAccessor {

  @Input()
  item: Item;

  @Input()
  new = false;

  valueChangesSubscription: Subscription;
  @Input()
  form: FormGroup;

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.initForm();
  }

  initForm(): void {
    const item = this.item || new Item();

    if (this.valueChangesSubscription) {
      this.valueChangesSubscription.unsubscribe();
    }

    this.form = this.formBuilder.group({
      title: item.title,
      cost: item.cost,
      weight: item.weight
    });

    this.valueChangesSubscription = this.form.valueChanges.subscribe(value => {
      console.log('item change', value);
      this.propagateChange(value);
    });
  }

  writeValue(item: Item): void {
    this.item = item;
    this.initForm();
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
