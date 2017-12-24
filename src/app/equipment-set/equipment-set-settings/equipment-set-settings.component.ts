import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { EditEquipmentSetSettingsComponent } from '../edit-equipment-set-settings/edit-equipment-set-settings.component';
import { EquipmentSetSettingsSetAction } from '../store/actions/equipment-set-settings.actions';
import { EquipmentSetState, selectEquipmentSetSettings } from '../store/equipment-set.reducer';
import { EquipmentSetSettingsState } from '../store/reducer/equipment-set-settings.reducer';

@Component({
  selector: 'equip-equipment-set-settings',
  templateUrl: './equipment-set-settings.component.html',
  styleUrls: ['./equipment-set-settings.component.scss']
})
export class EquipmentSetSettingsComponent implements OnInit {

  private settings$: Observable<EquipmentSetSettingsState>;

  constructor(private store: Store<{ equipmentSet: EquipmentSetState }>,
              private matDialog: MatDialog) { }

  ngOnInit() {
    this.settings$ = this.store.select(selectEquipmentSetSettings);
  }

  edit(): void {
    const dialogRef = this.matDialog.open(EditEquipmentSetSettingsComponent);
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.store.dispatch(new EquipmentSetSettingsSetAction(result));
      }
    });
  }

}
