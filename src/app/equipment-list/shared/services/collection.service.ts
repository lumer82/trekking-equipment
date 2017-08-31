import { Injectable } from '@angular/core';
import { Collection } from '../../../shared/domain/collection';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class CollectionService {

  constructor() { }

  get(id: number): Observable<Collection> {
    throw new Error('Not implemented');
  }
}
