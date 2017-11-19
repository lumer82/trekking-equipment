import { SetEquipmentSetAction } from './store/actions/equipment-set.actions';
import { EquipmentSetState, selectEquipmentSet } from './store/equipment-set.reducer';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { EquipmentSet } from './../../shared/models/equipment-set.model';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';

@Component({
  selector: 'equip-equipment-set',
  templateUrl: './equipment-set.component.html',
  styleUrls: ['./equipment-set.component.scss']
})
export class EquipmentSetComponent implements OnInit {

  equipmentSet$: Observable<EquipmentSet>;

  constructor(
    private activatedRoute: ActivatedRoute,
    private store: Store<{ equipmentSet: EquipmentSetState }>) { }

  ngOnInit() {
    this.equipmentSet$ = this.store.select(selectEquipmentSet);

    this.activatedRoute.data
    .subscribe((data: {equipmentSet: EquipmentSet}) => this.store.dispatch(new SetEquipmentSetAction(data.equipmentSet)));
  }

}
