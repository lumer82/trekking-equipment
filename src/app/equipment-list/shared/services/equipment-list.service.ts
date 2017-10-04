import { Injectable } from '@angular/core';
import { LinkType, LinkTypes } from '../../../shared/domain/link';
import { Item } from '../../../shared/domain/item';
import { Entry } from '../../../shared/domain/entry';
import { Collection } from '../../../shared/domain/collection';
import { Mapped } from '../../equipment-list.component';
import { Variant } from '../../../shared/domain/variant';

@Injectable()
export class EquipmentListService {

  constructor() {
  }

  private _oldEntityLinks: Array<LinkTypes>;
  private _oldEntries: Array<Entry>;

  /* tslint:enable:member-ordering */

  public buildMappedEntities(variant: Variant,
                             prevMappedEntities: Array<Mapped | {}>,
                             collection: Collection): Array<Mapped | {}> {
    if (!variant) {
      return prevMappedEntities || [];
    }

    let acc_price = 0;
    let acc_weight = 0;

    const mappedEntities = [];

    if (variant.entityLinks === this._oldEntityLinks && collection.entries === this._oldEntries) {
      return prevMappedEntities;
    }

    this._oldEntries = collection.entries;
    this._oldEntityLinks = variant.entityLinks;

    for (const link of variant.entityLinks) {
      if (link.linkType === LinkType.ENTRY) {
        const entry = collection.entries.find(e => e.id === link.entityId);
        if (!entry) {
          mappedEntities.push({});
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

}
