import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { ActivatedRoute, Router } from '@angular/router';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/shareReplay';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/scan';
import { Collection } from '../shared/domain/collection';
import { CollectionService } from './shared/services/collection.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Entry } from '../shared/domain/entry';
import { SettingsService } from '../shared/service/settings.service';
import 'rxjs/add/observable/of';
import { ReplaySubject } from 'rxjs/ReplaySubject';
import { EntryLink, LinkType, LinkTypes } from '../shared/domain/link';
import { Variant } from '../shared/domain/variant';
import { Item } from '../shared/domain/item';
import { DragulaService } from 'ng2-dragula';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/withLatestFrom';
import { isNull, isNullOrUndefined } from 'util';

export interface Mapped {
  entity: Entry | Collection;
  selected: Item;
  acc_price: number;
  acc_weight: number;
}

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
  collection$ = this.replay$.asObservable().filter(collection => !!collection);
  form: FormGroup;

  linkType: typeof LinkType = LinkType;
  mappedEntities: Array<Mapped | {}>;

  notMappedEntries: Array<Entry>;

  newEntry = new Entry();

  constructor(private activatedRoute: ActivatedRoute,
              private collectionService: CollectionService,
              private formBuilder: FormBuilder,
              private settingsService: SettingsService,
              private changeDetectorRef: ChangeDetectorRef,
              private dragulaService: DragulaService,
              private router: Router) {
    dragulaService.drop.subscribe((value) => {
      const entityLinks = [...this.getSelectedVariant(this.collection).entityLinks];
      this.replay$.next(this.updateVariant(this.collection, this.collection.variants[this.collection.selectedVariantId], {entityLinks}));
      this.changeDetectorRef.detectChanges();
    });
  }

  ngOnInit() {
    this.form = this.formBuilder.group({
      title: '',
      budget: '',
      weight: ''
    });

    const id$ = this.activatedRoute.paramMap.map(map => map.get('id'));
    this.isNewList$ = id$.map(id => id === 'new');
    id$.switchMap(id =>
      id === 'new'
        ? Observable.of(new Collection)
        : this.collectionService.get(id))
      .do(collection => {
        if (isNullOrUndefined(collection)) {
          this.router.navigate(['new']);
        }
      })
      .subscribe(collection => {
        this.form.setValue({
          title: collection.settings.title,
          budget: collection.settings.budget,
          weight: collection.settings.weight
        });
        this.replay$.next(collection);
      });

    this.form.valueChanges
      .subscribe(settings => {
        this.replay$.next({...this.collection, settings});
      });

    this.collection$
      .subscribe(collection => {
        this.collection = collection;

        this.mappedEntities = this.buildMappedEntities(this.collection);

        const mappedEntries = this.mappedEntities
          // .filter(e => (<Mapped>e).entity instanceof Entry) // TODO only use objects of type entry
          .map(e => (<Mapped>e).entity);

        this.notMappedEntries = collection.entries
          .filter(e => mappedEntries.findIndex(me => (<Entry>me).id === e.id) === -1);
      });

    this.collection$
      .map(collection => collection.settings)
      .distinctUntilChanged()
      .subscribe(settings => {
        this.settingsService.updateSettings(settings);
      });
  }

  getSelectedVariant(collection: Collection): Variant {
    return collection.variants[collection.selectedVariantId];
  }

  getEntry(collection: Collection, linkId: Number): Entry {
    return collection.entries.find(e => e.id === linkId);
  }

  entryChanged(entry: Entry): void {
    const index = this.collection.entries.findIndex(e => e.id === entry.id);
    this.replay$.next(this.updateEntries(this.collection, this.collection.entries, entry, index));
  }


  trackByLinkId(index: number, link: LinkTypes): string {
    return `${link.linkType}_${link.entityId}`;
  }

  selectedIdChange(selectedId: number, index: number): void {
    const oldVariant = this.getSelectedVariant(this.collection);
    const link = {...oldVariant.entityLinks[index], selectedId};
    this.replay$.next(this.updateEntityLinks(this.collection, oldVariant.entityLinks, link, index));
  }

  /* tslint:disable:member-ordering */
  private _oldEntityLinks: Array<LinkTypes>;
  private _oldEntries: Array<Entry>;
  /* tslint:enable:member-ordering */

  private buildMappedEntities(collection: Collection): Array<Mapped | {}> {
    const variant = this.getSelectedVariant(collection);
    if (!variant) {
      return this.mappedEntities || [];
    }

    let acc_price = 0;
    let acc_weight = 0;

    const mappedEntities = [];

    if (variant.entityLinks === this._oldEntityLinks && collection.entries === this._oldEntries) {
      return this.mappedEntities;
    }

    this._oldEntries = collection.entries;
    this._oldEntityLinks = variant.entityLinks;

    for (const link of variant.entityLinks) {
      if (link.linkType === LinkType.ENTRY) {
          const entry = collection.entries.find(e => e.id === link.entityId);
          if (!entry) {
            this.mappedEntities.push({

            });
            continue;
          }

          const item = entry.items.find(i => i.id === link.selectedId) || new Item();

          acc_price += item.price;
          acc_weight += item.weight;

          const mapped = {
            entity: entry,
            selected: item,
            acc_price: acc_price,
            acc_weight: acc_weight
          };

          mappedEntities.push(mapped);
      }
    }
    return mappedEntities;
  }

  addEntry(entry: Entry): void {
    console.log('*********** Begin addEntry ***********');
    entry = this.newEntry;

    const link: EntryLink = {
      linkType: LinkType.ENTRY,
      entityId: entry.id,
      selectedId: entry.items && entry.items.length > 0 ? entry.items[0].id : null
    };
    let collection = this.updateEntityLinks(this.collection,
      this.collection.variants[this.collection.selectedVariantId].entityLinks,
      link);
    collection = this.updateEntries(collection, collection.entries, entry);
    this.replay$.next(collection);

    this.newEntry = new Entry();
    this.changeDetectorRef.detectChanges();

    console.log('*********** End addEntry ***********');
  }

  private updateEntries(collection, oldEntries: Array<Entry>, entry: Entry, index?: number): Collection {
    index = isNullOrUndefined(index) ? oldEntries.length : index;
    const entries = [...oldEntries.slice(0, index), entry, ...oldEntries.slice(index + 1)];
    return this.updateCollection(collection, {entries});
  }

  private updateEntityLinks(collection: Collection, oldEntityLinks: Array<LinkTypes>, link: LinkTypes, index?: number): Collection {
    index = isNullOrUndefined(index) ? oldEntityLinks.length : index;
    const entityLinks = [...oldEntityLinks.slice(0, index), link, ...oldEntityLinks.slice(index + 1)];
    return this.updateVariant(collection, collection.variants[collection.selectedVariantId], {entityLinks});
  }

  private updateVariant(collection: Collection, variant: Variant, value: any): Collection {
    return this.updateVariants(collection, collection.variants, {...variant, ...value});
  }

  private updateVariants(collection: Collection, oldVariants: {[key: string]: Variant}, variant: Variant): Collection {
    const variants = {...oldVariants};
    variants[variant.id] = variant;
    return this.updateCollection(collection, {variants});
  }

  private updateCollection(collection: Collection, value: any): Collection {
    return {...collection, ...value};
  }

  save(): void {
    this.collectionService
      .save(this.collection)
      .withLatestFrom(this.isNewList$)
      .subscribe(([collection, isNewList]) => {
        if (isNewList) {
          this.router.navigate([collection._id]);
        } else {
          this.collection = collection;
        }
      });
  }
}
