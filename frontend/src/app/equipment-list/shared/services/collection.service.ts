import { Injectable } from '@angular/core';
import { Collection, TEST_COLLECTION } from '../../../shared/domain/collection';
import { Observable } from 'rxjs/Observable';
import { isNullOrUndefined } from 'util';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class CollectionService {

  private collections: Map<number, Collection> = new Map<number, Collection>();

  constructor(private http: HttpClient) {
  }

  get(id: string): Observable<Collection> {
    return this.http.get<Collection>(`http://localhost:8000/collections/${id}`);
  }

  save(collection: Collection): Observable<Collection> {
    if (collection._id) {
      return this.http.put<Collection>(`http://localhost:8000/collections/${collection._id}`, collection);
    } else {
      return this.http.post<Collection>(`http://localhost:8000/collections`, collection);
    }
  }
}
