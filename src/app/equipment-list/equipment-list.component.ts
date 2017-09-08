import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { ActivatedRoute } from '@angular/router';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/shareReplay';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/scan';
import { Collection, TEST_COLLECTION } from '../shared/domain/collection';
import { CollectionService } from './shared/services/collection.service';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { Entry } from '../shared/domain/entry';
import { SettingsService } from '../shared/service/settings.service';
import 'rxjs/add/observable/of';
import { ReplaySubject } from 'rxjs/ReplaySubject';

@Component({
  selector: 'equip-equipment-list',
  templateUrl: './equipment-list.component.html',
  styleUrls: ['./equipment-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EquipmentListComponent implements OnInit {

  isNewList$: Observable<boolean>;
  private replay$ = new ReplaySubject<Collection>();
  collection: Collection;
  collection$ = this.replay$.asObservable();
  form: FormGroup;

  constructor(private activatedRoute: ActivatedRoute,
              private collectionService: CollectionService,
              private formBuilder: FormBuilder,
              private settingsService: SettingsService) {
  }

  ngOnInit() {
    const id$ = this.activatedRoute.paramMap.map(map => map.get('id'));
    this.isNewList$ = id$.map(id => id === 'new');
    // this.collection$ = id$.map(id => id === 'new' ? TEST_COLLECTION : this.collectionService.get(+id)).shareReplay().do(col => console.log('col', col));
    const col$ = Observable.of(TEST_COLLECTION).do(col => console.log('col source', col)).shareReplay();

    this.form = this.formBuilder.group({
      title: '',
      budget: '',
      weight: ''
    });

    this.form.valueChanges
      .subscribe(value => {
        this.replay$.next({...this.collection, ...value});
      });

    col$
      .subscribe(collection => {
        this.replay$.next(collection);
      });

    this.collection$
      .subscribe(collection => {
      this.collection = collection;
    });

    this.collection$
      .map(collection => ({title: collection.title, budget: collection.budget, weight: collection.weight}))
      .scan((prev, settings) => Object.keys(settings).every(key => prev[key] === settings[key]) ? prev : settings)
      .distinctUntilChanged()
      .subscribe(settings => {
        this.form.setValue(settings);
      })

    this.collection$
      .map(collection => ({budget: collection.budget, weight: collection.weight}))
      .scan((prev, settings) => Object.keys(settings).every(key => prev[key] === settings[key]) ? prev : settings)
      .distinctUntilChanged()
      .subscribe(settings => {
        this.settingsService.updateSettings(settings);
      });
  }

  entriesChanged(entries: Array<Entry>, index: number): void {
    this.replay$.next({...this.collection, entries});
  }

}
