import { Component, OnInit } from '@angular/core';
import {Store} from '@ngrx/store';
import {EquipmentSetState} from '../../shared/store/reducer/equipment-set.reducer';
import {Observable} from 'rxjs/Observable';

@Component({
  selector: 'equip-equipment-set',
  templateUrl: './equipment-set.component.html',
  styleUrls: ['./equipment-set.component.scss']
})
export class EquipmentSetComponent implements OnInit {

  public equipmentSet$: Observable<EquipmentSetState>;

  constructor(private store: Store<EquipmentSetState>) { }

  ngOnInit() {
    this.equipmentSet$ = <Observable<EquipmentSetState>>this.store.select(state => state);
  }

}
