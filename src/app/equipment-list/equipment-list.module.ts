import { forwardRef, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EquipmentListComponent } from './equipment-list.component';
import { EquipmentListRoutingModule } from './equipment-list.routing.module';
import {
  MD_PLACEHOLDER_GLOBAL_OPTIONS, MdButtonModule, MdIconModule, MdInputModule, MdRadioModule,
  MdSelectModule
} from '@angular/material';
import { EntryComponent } from './entry/entry.component';
import { CollectionService } from './shared/services/collection.service';
import { FormsModule, NG_VALUE_ACCESSOR, ReactiveFormsModule } from '@angular/forms';
import { ItemComponent } from './item/item.component';
import { SettingsService } from '../shared/service/settings.service';
import { DragulaModule } from 'ng2-dragula';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  imports: [
    CommonModule,
    EquipmentListRoutingModule,
    MdButtonModule,
    MdIconModule,
    MdInputModule,
    MdSelectModule,
    MdRadioModule,
    FormsModule,
    ReactiveFormsModule,
    DragulaModule,
    HttpClientModule
  ],
  declarations: [
    EquipmentListComponent,
    EntryComponent,
    ItemComponent
  ],
  exports: [
    EquipmentListComponent
  ],
  providers: [
    CollectionService,
    SettingsService,
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => EntryComponent),
      multi: true
    },
    {provide: MD_PLACEHOLDER_GLOBAL_OPTIONS, useValue: {float: 'never'}}
  ]
})
export class EquipmentListModule {
}
