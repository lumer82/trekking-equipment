import { EditCollectionLimitsComponent } from './edit-collection-limits/edit-collection-limits.component';
import { EditEquipmentSetSettingsComponent } from './edit-equipment-set-settings/edit-equipment-set-settings.component';
import { EquipmentSetSettingsComponent } from './equipment-set-settings/equipment-set-settings.component';
import { LimitIconComponent } from './limit-icon/limit-icon.component';
import { LimitsViewComponent } from './limits-view/limits-view.component';
import { SelectedEquipmentItemComponent } from './selected-equipment-item/selected-equipment-item.component';
import { EquipmentEntryComponent } from './equipment-entry/equipment-entry.component';
import { EquipmentCollectionComponent } from './equipment-collection/equipment-collection.component';
import { EquipmentItemEffects } from './store/effects/equipment-item.effects';
import { EQUIPMENT_SET_FEATURE_NAME, equipmentSetReducer } from './store/equipment-set.reducer';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EquipmentSetComponent } from './equipment-set.component';
import { EquipmentSetRoutingModule } from './equipment-set.routing.module';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import {
  MatButtonModule, MatCardModule, MatDialogModule, MatFormFieldModule, MatIconModule, MatInputModule,
  MatRadioModule
} from '@angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { environment } from '../../environments/environment';
import { UpdateTotalsEffects } from './store/effects/update-totals.effects';
import { CalculateTotalsService } from './services/calculate-totals.service';
import { EditEquipmentItemComponent } from './edit-equipment-item/edit-equipment-item.component';
import { StoreSelectHelperService } from './store/store-select-helper.service';

export function loadInitialState() {
  if (!environment.production) {
    return JSON.parse(localStorage.getItem('state'));
  }
  return null;
}

@NgModule({
  imports: [
    CommonModule,
    EquipmentSetRoutingModule,
    StoreModule.forFeature(EQUIPMENT_SET_FEATURE_NAME, equipmentSetReducer),
    EffectsModule.forFeature([UpdateTotalsEffects, EquipmentItemEffects]),
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatRadioModule,
    MatDialogModule
  ],
  declarations: [
    EquipmentSetComponent,
    EquipmentCollectionComponent,
    EquipmentEntryComponent,
    EquipmentSetSettingsComponent,
    SelectedEquipmentItemComponent,
    EditEquipmentItemComponent,
    EditEquipmentSetSettingsComponent,
    LimitIconComponent,
    LimitsViewComponent,
    EditCollectionLimitsComponent
  ],
  providers: [
    CalculateTotalsService,
    StoreSelectHelperService
  ],
  entryComponents: [
    EditEquipmentItemComponent,
    EditEquipmentSetSettingsComponent,
    EditCollectionLimitsComponent
  ]
})
export class EquipmentSetModule { }
