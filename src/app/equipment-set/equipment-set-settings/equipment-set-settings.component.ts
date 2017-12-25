import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators';
import { EquipmentLimitDefinition } from '../../shared/models/equipment-limit-definition.model';
import { EditEquipmentSetSettingsComponent } from '../edit-equipment-set-settings/edit-equipment-set-settings.component';
import { EquipmentSetSettingsSetAction } from '../store/actions/equipment-set-settings.actions';
import {
  EquipmentSetFeatureState, EquipmentSetState, selectEquipmentLimits,
  selectEquipmentSetSettings
} from '../store/equipment-set.reducer';
import { EquipmentSetSettingsState } from '../store/reducer/equipment-set-settings.reducer';
import { StoreSelectHelperService } from '../store/store-select-helper.service';

@Component({
  selector: 'equip-equipment-set-settings',
  templateUrl: './equipment-set-settings.component.html',
  styleUrls: ['./equipment-set-settings.component.scss']
})
export class EquipmentSetSettingsComponent implements OnInit {

  private settings$: Observable<EquipmentSetSettingsState>;
  private limitDefinitions$: Observable<Array<EquipmentLimitDefinition>>;

  constructor(private store: Store<EquipmentSetFeatureState>,
              private storeSelect: StoreSelectHelperService,
              private matDialog: MatDialog) { }

  ngOnInit() {
    this.settings$ = this.store.select(selectEquipmentSetSettings);

    this.limitDefinitions$ = this.storeSelect.getLimitDefinitions();
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
