import { TestBed, inject } from '@angular/core/testing';

import { CollectionService } from './collection.service';

xdescribe('CollectionService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CollectionService]
    });
  });

  it('should be created', inject([CollectionService], (service: CollectionService) => {
    expect(service).toBeTruthy();
  }));
});
