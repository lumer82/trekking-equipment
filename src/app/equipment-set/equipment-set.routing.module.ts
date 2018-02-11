import { EquipmentSetComponent } from './equipment-set.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EquipmentCollectionEditComponent } from './equipment-collection-edit/equipment-collection-edit.component';
import { EditCollectionResolver } from './services/edit-collection.resolver';
import { EquipmentSetResolver } from './services/equipment-set-resolver.service';
import { EditCollectionCanActivateService } from './services/edit-collection-can-activate.service';

const routes: Routes = [
  {
    path: ':set-id/edit-collection/:collection-id',
    component: EquipmentCollectionEditComponent,
    canActivate: [ EditCollectionCanActivateService ]
  },
  { path: ':set-id',
    component: EquipmentSetComponent,
    resolve: {
      equipmentSet: EquipmentSetResolver
    }
  },
  { path: '', pathMatch: 'full', redirectTo: 'new' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [
    EquipmentSetResolver,
    EditCollectionCanActivateService
  ]
})
export class EquipmentSetRoutingModule { }
