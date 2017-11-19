import { EquipmentSetComponent } from './equipment-set.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: 'new',
    component: EquipmentSetComponent,
    data: {
      equipmentSet: {
        name: 'New'
      }
    }
  },
  { path: '', pathMatch: 'full', redirectTo: 'new' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EquipmentSetRoutingModule { }
