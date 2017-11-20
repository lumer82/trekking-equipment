import { EquipmentCollectionComponent } from './equipment-collection/equipment-collection.component';
import { equipmentSetReducer, EQUIPMENT_SET_FEATURE_NAME } from './store/equipment-set.reducer';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EquipmentSetComponent } from './equipment-set.component';
import { EquipmentSetRoutingModule } from './equipment-set.routing.module';
import { StoreModule } from '@ngrx/store';
import { MatInputModule, MatFormFieldModule, MatButtonModule, MatIconModule, MatCardModule } from '@angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    EquipmentSetRoutingModule,
    StoreModule.forFeature(EQUIPMENT_SET_FEATURE_NAME, equipmentSetReducer),
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule
  ],
  declarations: [
    EquipmentSetComponent,
    EquipmentCollectionComponent
  ]
})
export class EquipmentSetModule { }
