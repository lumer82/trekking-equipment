import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { EquipmentLimitDefinition, IconType, LimitType } from '../../shared/models/equipment-limit-definition.model';
import { Observable } from 'rxjs/Observable';
import { EquipmentSetFeatureState } from '../store/equipment-set.reducer';
import { Store } from '@ngrx/store';
import { StoreSelectHelperService } from '../store/store-select-helper.service';
import { AbstractControl, FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UpdateManyEquipmentLimitsAction } from '../store/actions/equipment-limits.actions';
import { MatDialogRef } from '@angular/material';
import { filter, map, take } from 'rxjs/operators';

@Component({
  selector: 'equip-edit-equipment-limit-definition',
  templateUrl: './edit-equipment-limit-definition.component.html',
  styleUrls: ['./edit-equipment-limit-definition.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EditEquipmentLimitDefinitionComponent implements OnInit {

  limits: Array<EquipmentLimitDefinition>;
  iconTypes = IconType;

  edit: FormGroup;
  new: FormGroup;

  constructor(private store: Store<EquipmentSetFeatureState>,
              private storeSelect: StoreSelectHelperService,
              private formBuilder: FormBuilder,
              private changeDetectorRef: ChangeDetectorRef,
              private dialogRef: MatDialogRef<EditEquipmentLimitDefinitionComponent>) {
  }

  ngOnInit() {
    this.edit = this.formBuilder.group({
      limits: this.formBuilder.array([])
    });

    this.storeSelect.getLimitDefinitions().subscribe((limits) => {
      this.edit.setControl('limits', this.formBuilder.array(
        limits.map(limit => this.createLimitFormGroup(limit))
      ));
      this.changeDetectorRef.markForCheck();
    });

    this.new = this.formBuilder.group({
      name: [null, [Validators.required], this.validateLimitNotExists.bind(this)]
    });

    this.dialogRef.afterClosed()
      .pipe(filter(value => !!value))
      .subscribe((value: { limits: Array<EquipmentLimitDefinition> }) => {
          const changes = value.limits.map(limit => ({
            id: limit.name,
            changes: {...limit, type: limit.type ? LimitType.GLOBAL : LimitType.LOCAL }
          }));
          this.store.dispatch(new UpdateManyEquipmentLimitsAction(changes));
        }
      );
  }

  validateLimitNotExists(control: AbstractControl): Observable<{[key: string]: { value: string}}> {
    const value = control.value.trim();
    return this.storeSelect.getLimitDefinitions().pipe(
      take(1),
      map(limits => !!limits.find(limit => limit.name === value)),
      map(exists => exists ? { 'limitExists': {value: control.value}} : null)
    );
  }

  private createLimitFormGroup(limit: EquipmentLimitDefinition): FormGroup {
    return this.formBuilder.group({
      name: limit.name,
      displayName: limit.displayName,
      type: limit.type === LimitType.GLOBAL,
      icon: this.formBuilder.group({
        name: (limit.icon && limit.icon.name) || null,
        type: (limit.icon && limit.icon.type) || null
      })
    });
  }

  add(newLimit: EquipmentLimitDefinition): void {
    if (!!newLimit.name) {
      const limits = (this.edit.get('limits') as FormArray).controls;
      limits.push(this.createLimitFormGroup({...newLimit, type: LimitType.GLOBAL}));
    }
  }

  trackByName(index: number, limit: EquipmentLimitDefinition): string {
    return limit.name;
  }

}
