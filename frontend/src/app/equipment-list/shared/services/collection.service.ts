import { Injectable } from '@angular/core';
import { Collection, TEST_COLLECTION } from '../../../shared/domain/collection';
import { Observable } from 'rxjs/Observable';
import { isNullOrUndefined } from 'util';

@Injectable()
export class CollectionService {

  private collections: Map<number, Collection> = new Map<number, Collection>();

  constructor() {
    this.collections.set(TEST_COLLECTION.id, TEST_COLLECTION);
  }

  get(id: number): Observable<Collection> {
    return Observable.of(this.collections.get(id));
  }

  save(collection: Collection): Observable<Collection> {
    if (isNullOrUndefined(collection.id)) {
      collection.id = Date.now();
    }
    this.collections.set(collection.id, collection);
    return Observable.of(collection);
  }
}
