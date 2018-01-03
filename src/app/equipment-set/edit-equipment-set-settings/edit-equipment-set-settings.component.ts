import { ChangeDetectorRef, Component, HostListener, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { combineLatest, debounceTime, map, take, withLatestFrom } from 'rxjs/operators';
import { EquipmentLimitDefinition, LimitType } from '../../shared/models/equipment-limit-definition.model';
import { EditEquipmentItemComponent } from '../edit-equipment-item/edit-equipment-item.component';
import { EquipmentSetSettingsSetAction } from '../store/actions/equipment-set-settings.actions';
import {
  EQUIPMENT_SET_FEATURE_NAME, EquipmentSetFeatureState, EquipmentSetState, selectEquipmentLimits,
  selectEquipmentSetSettings
} from '../store/equipment-set.reducer';
import { EquipmentSetSettingsState } from '../store/reducer/equipment-set-settings.reducer';
import { EditEquipmentLimitDefinitionComponent } from '../edit-equipment-limit-definition/edit-equipment-limit-definition.component';

@Component({
  selector: 'equip-edit-equipment-set-settings',
  templateUrl: 'edit-equipment-set-settings.component.html',
  styleUrls: ['edit-equipment-set-settings.component.scss']
})
export class EditEquipmentSetSettingsComponent implements OnInit {

  settings$: Observable<EquipmentSetSettingsState>;
  limits$: Observable<Array<EquipmentLimitDefinition>>;
  globalLimits$: Observable<Array<EquipmentLimitDefinition>>;
  form: FormGroup;

  @HostListener('keyup', ['$event'])
  onEnter($event: KeyboardEvent) {
    if ($event.key === 'Enter' && this.form) {
      this.dialogRef.close(this.form.getRawValue());
    }
  }

  constructor(private store: Store<EquipmentSetFeatureState>,
              private formBuilder: FormBuilder,
              private dialogRef: MatDialogRef<EditEquipmentItemComponent>,
              private dialog: MatDialog,
              private changeDetectorRef: ChangeDetectorRef) {
  }

  ngOnInit() {
    this.settings$ = this.store.select(selectEquipmentSetSettings);


    this.limits$ = this.store.select(selectEquipmentLimits).pipe(
      map(limits => (limits.ids as string[]).map(id => limits.entities[id]))
    );

    this.globalLimits$ = this.limits$.pipe(map(limits => limits.filter(limit => limit.type === LimitType.GLOBAL)));

    this.settings$.pipe(
      combineLatest(this.limits$)
    ).subscribe(([settings, limits]) => {
      const valueOrUndefined = <T>(obj: T, key: string) => !!obj ? obj[key] : undefined;

      const limitGroup = limits.reduce((group, limit) => {
        group[limit.name] = new FormControl(valueOrUndefined(settings.limits, limit.name));
        return group;
      }, {});

      this.form = this.formBuilder.group({
        name: settings.name,
        limits: new FormGroup(limitGroup)
      });

      this.changeDetectorRef.markForCheck();
    });
  }

  editLimits(): void {
    this.dialog.open(EditEquipmentLimitDefinitionComponent).afterClosed().subscribe(() => this.changeDetectorRef.markForCheck());
  }

}
