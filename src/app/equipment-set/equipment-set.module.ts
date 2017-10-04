import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EquipmentSetComponent } from './equipment-set.component';
import { MdInputModule } from '@angular/material';
import { EquipmentListModule } from '../equipment-list/equipment-list.module';
import { EquipmentSetRoutingModule } from './equipment-set.routing.module';

@NgModule({
  imports: [
    CommonModule,
    EquipmentSetRoutingModule,
    MdInputModule,
    EquipmentListModule
  ],
  declarations: [EquipmentSetComponent]
})
export class EquipmentSetModule {
}
