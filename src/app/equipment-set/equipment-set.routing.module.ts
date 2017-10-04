import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { EquipmentSetComponent } from './equipment-set.component';

const routes: Routes = [
  {
    path: ':id',
    component: EquipmentSetComponent
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'new'
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class EquipmentSetRoutingModule {}
