import { debounceTime } from 'rxjs/operators/debounceTime';
import { AddEquipmentCollectionAction } from './store/actions/equipment-collection.actions';
import { SetEquipmentSetAction } from './store/actions/equipment-set.actions';
import { EquipmentSetState, selectEquipmentSet } from './store/equipment-set.reducer';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { EquipmentSet } from '../../shared/models/equipment-set.model';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { SetEquipmentSetNameAction } from './store/actions/equipment-set-name.actions';
import { environment } from '../../environments/environment';
import { empty } from 'rxjs/observable/empty';

@Component({
  selector: 'equip-equipment-set',
  templateUrl: './equipment-set.component.html',
  styleUrls: ['./equipment-set.component.scss']
})
export class EquipmentSetComponent implements OnInit {
  equipmentSet$: Observable<EquipmentSet>;
  nameForm: FormControl;

  constructor(
    private activatedRoute: ActivatedRoute,
    private store: Store<{ equipmentSet: EquipmentSetState }>
  ) {}

  ngOnInit() {
    this.nameForm = new FormControl();
    this.nameForm.valueChanges
      .pipe(debounceTime(800))
      .subscribe(name =>
        this.store.dispatch(new SetEquipmentSetNameAction(name))
      );
    this.equipmentSet$ = this.store.select(selectEquipmentSet);

    this.activatedRoute.data.subscribe((data: { equipmentSet: EquipmentSet }) =>
      this.store.dispatch(new SetEquipmentSetAction(data.equipmentSet))
    );

    if (!environment.production) {
     // this.store
     //   .select(selectEquipmentSet)
     //   .pipe(debounceTime(5000))
     //   .subscribe(state =>
     //     localStorage.setItem('state', JSON.stringify(state))
     //   );
    }
  }

  addCollection(): void {
    this.store.dispatch(
      new AddEquipmentCollectionAction({
        id: Date.now() + '',
        name: 'New Collection',
        entries: []
      })
    );
  }
}
