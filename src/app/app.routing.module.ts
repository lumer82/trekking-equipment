import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StartPageComponent } from './start-page/start-page.component';

const routes: Routes = [
  { path: 'start', component: StartPageComponent },
  { path: 'equipment-set', loadChildren: 'app/equipment-set/equipment-set.module#EquipmentSetModule' },
  { path: '', pathMatch: 'full', redirectTo: 'start' }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      enableTracing: false
    })
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule {}
