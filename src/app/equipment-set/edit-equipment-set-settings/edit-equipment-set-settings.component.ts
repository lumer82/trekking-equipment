import { Component, HostListener, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef } from '@angular/material';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { debounceTime, take } from 'rxjs/operators';
import { EditEquipmentItemComponent } from '../edit-equipment-item/edit-equipment-item.component';
import { EquipmentSetSettingsSetAction } from '../store/actions/equipment-set-settings.actions';
import {
  EQUIPMENT_SET_FEATURE_NAME, EquipmentSetState,
  selectEquipmentSetSettings
} from '../store/equipment-set.reducer';
import { EquipmentSetSettingsState } from '../store/reducer/equipment-set-settings.reducer';

@Component({
  selector: 'equip-edit-equipment-set-settings',
  templateUrl: 'edit-equipment-set-settings.component.html',
  styleUrls: ['edit-equipment-set-settings.component.scss']
})
export class EditEquipmentSetSettingsComponent implements OnInit {

  private settings$: Observable<EquipmentSetSettingsState>;
  private form: FormGroup;

  @HostListener('keyup', ['$event'])
  onEnter($event: KeyboardEvent) {
    if ($event.key === 'Enter' && this.form) {
      this.dialogRef.close(this.form.getRawValue());
    }
  }

  constructor(private store: Store<{ equipmentSet: EquipmentSetState }>,
              private formBuilder: FormBuilder,
              private dialogRef: MatDialogRef<EditEquipmentItemComponent>) { }

  ngOnInit() {
    this.settings$ = this.store.select(selectEquipmentSetSettings);

    const valueOrUndefined = <T, K extends keyof T>(obj: T, key: K) => !!obj ? obj[key] : undefined;

    this.settings$.pipe(take(1))
      .subscribe(settings =>
        this.form = this.formBuilder.group({
          name: settings.name,
          limits: this.formBuilder.group({
            budget: valueOrUndefined(settings.limits, 'budget'),
            weight: valueOrUndefined(settings.limits, 'weight'),
            volume: valueOrUndefined(settings.limits, 'volume')
          })
        }));
  }

}
