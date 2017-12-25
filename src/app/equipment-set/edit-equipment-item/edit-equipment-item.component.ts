import { Component, HostListener, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { map, take } from 'rxjs/operators';
import { EquipmentItem } from '../../shared/models/equipment-item.model';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { EquipmentLimit } from '../../shared/models/equipment-limit.model';
import { EquipmentSetFeatureState, selectEquipmentLimits } from '../store/equipment-set.reducer';

@Component({
  selector: 'equip-edit-equipment-item',
  templateUrl: './edit-equipment-item.component.html',
  styleUrls: ['./edit-equipment-item.component.scss']
})
export class EditEquipmentItemComponent implements OnInit {

  form: FormGroup;
  limits$: Observable<Array<EquipmentLimit>>;

  @HostListener('keyup', ['$event'])
  onEnter($event: KeyboardEvent) {
    if ($event.key === 'Enter') {
      this.dialogRef.close(this.value);
    }
  }

  constructor(@Inject(MAT_DIALOG_DATA) private item: EquipmentItem,
              private dialogRef: MatDialogRef<EditEquipmentItemComponent>,
              private formBuilder: FormBuilder,
              private store: Store<EquipmentSetFeatureState>) {
  }

  ngOnInit() {
    this.limits$ =
      this.limits$ = this.store.select(selectEquipmentLimits).pipe(
        map(limits => (limits.ids as string[]).map(id => limits.entities[id]))
      );

    this.limits$.pipe(take(1))
      .subscribe(limits => {
        const valueOrUndefined = <T>(obj: T, key: string) => !!obj ? obj[key] : undefined;

        const limitGroup = limits.reduce((group, limit) => {
          group[limit.name] = new FormControl(valueOrUndefined(this.item.values, limit.name));
          return group;
        }, {});

        this.form = this.formBuilder.group({
          name: this.item.name,
          values: new FormGroup(limitGroup)
        });
      });
  }

  get value(): EquipmentItem {
    return {...this.item, ...this.form.getRawValue()};
  }
}
