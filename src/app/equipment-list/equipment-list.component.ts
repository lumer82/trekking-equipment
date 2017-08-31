import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { ActivatedRoute } from '@angular/router';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/shareReplay';
import { Collection, TEST_COLLECTION } from '../shared/domain/collection';
import { CollectionService } from './shared/services/collection.service';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { Entry } from '../shared/domain/entry';

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
              private formBuilder: FormBuilder) { }

  ngOnInit() {
    const id$ = this.activatedRoute.paramMap.map(map => map.get('id'));
    this.isNewList$ = id$.map(id => id === 'new');
    this.collection$ = id$.map(id => id === 'new' ? TEST_COLLECTION : this.collectionService.get(+id)).shareReplay();

    this.collection$.subscribe(collection => {
      this.form = this.formBuilder.group({
        title: collection.title,
        budget: collection.budget,
        weight: collection.weight,
        entries: this.formBuilder.array(collection.entries.map(e => this.formBuilder.group(
          {...e, items: this.formBuilder.array(e.items.map(i => this.formBuilder.group(i)))})))
      });
    });
  }

  get entries(): FormArray {
    return this.form.get('entries') as FormArray;
  }

  addEntry(): void {
    this.entries.push(this.formBuilder.group({...new Entry(), items: this.formBuilder.array([])}));
  }

}
