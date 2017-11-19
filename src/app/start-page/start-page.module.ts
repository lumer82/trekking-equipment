import { MatCardModule, MatButtonModule, MatIconModule } from '@angular/material';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StartPageComponent } from './start-page.component';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule
  ],
  declarations: [
    StartPageComponent
  ],
  exports: [
    StartPageComponent
  ]
})
export class StartPageModule { }
