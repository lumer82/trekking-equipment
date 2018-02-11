import { TestBed, inject } from '@angular/core/testing';

import { EditCollectionCanActivateService } from './edit-collection-can-activate.service';

describe('EditCollectionCanActivateService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [EditCollectionCanActivateService]
    });
  });

  it('should be created', inject([EditCollectionCanActivateService], (service: EditCollectionCanActivateService) => {
    expect(service).toBeTruthy();
  }));
});
