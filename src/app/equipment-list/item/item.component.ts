import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter, HostListener,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Item } from '../../shared/domain/item';
import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/operator/filter';

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
  itemChange: EventEmitter<Item> = new EventEmitter();

  @Output()
  addItem: EventEmitter<void> = new EventEmitter<void>();

  @Input()
  new = false;

  form: FormGroup;

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.initForm();
  }

  initForm(): void {
    const item = this.item || new Item();

    this.form = this.formBuilder.group({
      id: [item.id, Validators.required],
      title: [item.title, Validators.required],
      price: item.price,
      weight: item.weight
    });

    this.form.valueChanges
      .subscribe(value => {
      this.itemChange.emit(value);
    });
  }


  ngOnChanges(changes: SimpleChanges): void {
    const item = this.item || new Item();

    if (this.form) {
      this.form.setValue({
        id: item.id,
        title: item.title,
        price: item.price,
        weight: item.weight
      });
    }
  }

  @HostListener('keyup', ['$event'])
  keyup(ev: KeyboardEvent): void {
    if (ev.key === 'Enter' && this.new && this.form.valid) {
      ev.stopPropagation();
      this.addItem.emit();
      this.form.reset();
    }
  }
}
