import { SelectedEquipmentItemComponent } from './selected-equipment-item/selected-equipment-item.component';
import { EquipmentItemComponent } from './equipment-item/equipment-item.component';
import { EquipmentEntryComponent } from './equipment-entry/equipment-entry.component';
import { EquipmentCollectionComponent } from './equipment-collection/equipment-collection.component';
import { EquipmentCollectionEffects } from './store/effects/equipment-collection.effects';
import { EQUIPMENT_SET_FEATURE_NAME, equipmentSetReducer } from './store/equipment-set.reducer';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EquipmentSetComponent } from './equipment-set.component';
import { EquipmentSetRoutingModule } from './equipment-set.routing.module';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { MatButtonModule, MatCardModule, MatFormFieldModule, MatIconModule, MatInputModule, MatRadioModule } from '@angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { environment } from '../../environments/environment';

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
    EffectsModule.forFeature([EquipmentCollectionEffects]),
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatRadioModule
  ],
  declarations: [
    EquipmentSetComponent,
    EquipmentCollectionComponent,
    EquipmentEntryComponent,
    EquipmentItemComponent,
    SelectedEquipmentItemComponent
  ]
})
export class EquipmentSetModule { }
