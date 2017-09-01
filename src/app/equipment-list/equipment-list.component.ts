import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { ActivatedRoute } from '@angular/router';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/shareReplay';
import 'rxjs/add/operator/do';
import { Collection, TEST_COLLECTION } from '../shared/domain/collection';
import { CollectionService } from './shared/services/collection.service';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { Entry } from '../shared/domain/entry';
import { SettingsService } from '../shared/service/settings.service';
import 'rxjs/add/observable/of';

@Component({
  selector: 'equip-equipment-list',
  templateUrl: './equipment-list.component.html',
  styleUrls: ['./equipment-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EquipmentListComponent implements OnInit {

  isNewList$: Observable<boolean>;
  collection$: Observable<Collection>;
  form: FormGroup;

  constructor(private activatedRoute: ActivatedRoute,
              private collectionService: CollectionService,
              private formBuilder: FormBuilder,
              private settingsService: SettingsService) { }

  ngOnInit() {
    const id$ = this.activatedRoute.paramMap.map(map => map.get('id'));
    this.isNewList$ = id$.map(id => id === 'new');
    // this.collection$ = id$.map(id => id === 'new' ? TEST_COLLECTION : this.collectionService.get(+id)).shareReplay().do(col => console.log('col', col));
    this.collection$ = Observable.of(TEST_COLLECTION).do(col => console.log('col source', col)).shareReplay();

    this.collection$
      .subscribe(collection => {
      this.form = this.formBuilder.group({
        title: collection.title,
        budget: collection.budget,
        weight: collection.weight,
        entries: [collection.entries]
      });
      this.form.valueChanges
        .do(value => console.log('value changed', value))
        .subscribe(value => this.settingsService.updateSettings(value));
    });
  }

  get entries(): FormArray {
    return this.form.get('entries') as FormArray;
  }

  addEntry(): void {
    this.entries.push(this.formBuilder.group({...new Entry(), items: this.formBuilder.array([])}));
  }

}
