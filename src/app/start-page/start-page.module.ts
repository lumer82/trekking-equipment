import { TrekkingEquipmentMaterialModule } from './../../shared/trekking-equipment-material.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StartPageComponent } from './start-page.component';

@NgModule({
  imports: [
    CommonModule,
    TrekkingEquipmentMaterialModule
  ],
  declarations: [
    StartPageComponent
  ],
  exports: [
    StartPageComponent
  ]
})
export class StartPageModule { }
