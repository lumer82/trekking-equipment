import { TestBed, inject } from '@angular/core/testing';

import { EditCollectionResolverService } from './edit-collection.resolver';

describe('EditCollectionResolverService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [EditCollectionResolverService]
    });
  });

  it('should be created', inject([EditCollectionResolverService], (service: EditCollectionResolverService) => {
    expect(service).toBeTruthy();
  }));
});
