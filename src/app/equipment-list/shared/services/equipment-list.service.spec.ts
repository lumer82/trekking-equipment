import { TestBed, inject } from '@angular/core/testing';

import { EquipmentListService } from './equipment-list.service';

describe('EquipmentListService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [EquipmentListService]
    });
  });

  it('should be created', inject([EquipmentListService], (service: EquipmentListService) => {
    expect(service).toBeTruthy();
  }));
});
