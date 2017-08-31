import { forwardRef, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EquipmentListComponent } from './equipment-list.component';
import { EquipmentListRoutingModule } from './equipment-list.routing.module';
import { EditEquipmentListComponent } from './edit-equipment-list/edit-equipment-list.component';
import { NewEquipmentListComponent } from './new-equipment-list/new-equipment-list.component';
import { MdButtonModule, MdIconModule, MdInputModule, MdRadioModule, MdSelectModule } from '@angular/material';
import { EditEntryComponent } from './entry/entry.component';
import { CollectionService } from './shared/services/collection.service';
import { FormsModule, NG_VALUE_ACCESSOR, ReactiveFormsModule } from '@angular/forms';
import { ItemComponent } from './item/item.component';

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
    ReactiveFormsModule
  ],
  declarations: [
    EquipmentListComponent,
    EditEquipmentListComponent,
    NewEquipmentListComponent,
    EditEntryComponent,
    ItemComponent
  ],
  exports: [
    EquipmentListComponent
  ],
  providers: [
    CollectionService,
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => EditEntryComponent),
      multi: true
    }
  ]
})
export class EquipmentListModule { }
