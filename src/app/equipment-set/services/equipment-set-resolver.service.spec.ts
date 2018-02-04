import { TestBed, inject } from '@angular/core/testing';

import { EquipmentSetResolver } from './equipment-set-resolver.service';

describe('EquipmentSetResolver', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [EquipmentSetResolver]
    });
  });

  it('should be created', inject([EquipmentSetResolver], (service: EquipmentSetResolver) => {
    expect(service).toBeTruthy();
  }));
});
