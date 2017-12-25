import { Component, Inject, OnInit, Optional } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material';
import { Observable } from 'rxjs/Observable';
import { take } from 'rxjs/operators';
import { EquipmentLimitDefinition } from '../../shared/models/equipment-limit-definition.model';
import { StoreSelectHelperService } from '../store/store-select-helper.service';

@Component({
  selector: 'equip-edit-collection-limits',
  templateUrl: './edit-collection-limits.component.html',
  styleUrls: ['./edit-collection-limits.component.scss']
})
export class EditCollectionLimitsComponent implements OnInit {

  limitDefinitions$: Observable<Array<EquipmentLimitDefinition>>;
  form: FormGroup;

  constructor(@Optional() @Inject(MAT_DIALOG_DATA) public limits: { [key: string]: number },
              private storeSelect: StoreSelectHelperService) { }

  ngOnInit() {
    this.limitDefinitions$ = this.storeSelect.getLimitDefinitions();

    this.limitDefinitions$.pipe(take(1))
      .subscribe(limitDefinitions => {
        const valueOrUndefined = <T>(obj: T, key: string) => !!obj ? obj[key] : undefined;

        const limitGroup = limitDefinitions.reduce((group, limit) => {
          group[limit.name] = new FormControl(valueOrUndefined(this.limits, limit.name));
          return group;
        }, {});

        this.form = new FormGroup(limitGroup);
      });
  }

}
