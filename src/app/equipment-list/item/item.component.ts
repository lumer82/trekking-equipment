import {
  ChangeDetectionStrategy, Component, EventEmitter, forwardRef, Input, OnChanges, OnInit,
  Output, SimpleChanges
} from '@angular/core';
import { ControlValueAccessor, FormBuilder, FormGroup, NG_VALUE_ACCESSOR } from '@angular/forms';
import { Item } from '../../shared/domain/item';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'equip-item',
  templateUrl: 'item.component.html',
  styleUrls: ['item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ItemComponent implements OnInit, OnChanges {

  @Input()
  item: Item;

  @Output()
  itemChanged: EventEmitter<Item> = new EventEmitter();

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

    this.form = this.formBuilder.group({
      id: item.id,
      title: item.title,
      cost: item.cost,
      weight: item.weight
    });

    this.form.valueChanges.subscribe(value => {
      this.itemChanged.emit(value);
    });
  }


  ngOnChanges(changes: SimpleChanges): void {
    const item = this.item || new Item();

    this.form && this.form.setValue({
      id: item.id,
      title: item.title,
      cost: item.cost,
      weight: item.weight
    });
  }

}
