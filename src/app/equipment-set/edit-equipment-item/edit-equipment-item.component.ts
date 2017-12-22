import { Component, HostListener, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { EquipmentItem } from '../../shared/models/equipment-item.model';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'equip-edit-equipment-item',
  templateUrl: './edit-equipment-item.component.html',
  styleUrls: ['./edit-equipment-item.component.scss']
})
export class EditEquipmentItemComponent implements OnInit {

  form: FormGroup;

  @HostListener('keyup', ['$event'])
  onEnter($event: KeyboardEvent) {
    if ($event.key === 'Enter') {
      this.dialogRef.close(this.value);
    }
  }

  constructor(@Inject(MAT_DIALOG_DATA) private item: EquipmentItem,
              private dialogRef: MatDialogRef<EditEquipmentItemComponent>,
              private formBuilder: FormBuilder) {
  }

  ngOnInit() {
    this.form = this.formBuilder.group({
      name: this.item.name || null,
      price: this.item.price || null,
      weight: this.item.weight || null,
      volume: this.item.volume || null
    });
  }

  get value(): EquipmentItem {
    return {...this.item, ...this.form.getRawValue()};
  }
}
