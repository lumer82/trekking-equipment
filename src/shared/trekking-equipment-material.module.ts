import { NgModule } from '@angular/core';
import { MatCardModule, MatButtonModule, MatIconModule } from '@angular/material';

@NgModule({
  imports: [
    MatCardModule,
    MatButtonModule,
    MatIconModule
  ],
  exports: [
    MatCardModule,
    MatButtonModule,
    MatIconModule
  ]
})
export class TrekkingEquipmentMaterialModule { }
