import { ChangeDetectionStrategy, Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';
import { EquipmentSetFeatureState, selectEquipmentCollections } from '../store/equipment-set.reducer';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators';

@Component({
  selector: 'equip-move-collection-dialog',
  templateUrl: './move-collection-dialog.component.html',
  styleUrls: ['./move-collection-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MoveCollectionDialogComponent implements OnInit {

  collections$: Observable<Array<string>>;

  constructor(
    private store: Store<EquipmentSetFeatureState>,
    @Inject(MAT_DIALOG_DATA) public index: number) { }

  ngOnInit() {
    this.collections$ = this.store.select(selectEquipmentCollections).pipe(
      map(collections => collections.order.map(id => collections.entities[id].name))
    );
  }

}
