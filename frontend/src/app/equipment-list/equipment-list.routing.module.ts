import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { EquipmentListComponent } from './equipment-list.component';

const routes: Routes = [
  {
    path: ':id',
    component: EquipmentListComponent
    // children: [
    //   {
    //     path: ':id',
    //     component: EditEquipmentListComponent
    //   },
    //   {
    //     path: '',
    //     component: NewEquipmentListComponent
    //   }
    // ]
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
export class EquipmentListRoutingModule {}
