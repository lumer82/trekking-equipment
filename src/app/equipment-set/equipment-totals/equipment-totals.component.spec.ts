import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EquipmentTotalsComponent } from './equipment-totals.component';

describe('EquipmentTotalsComponent', () => {
  let component: EquipmentTotalsComponent;
  let fixture: ComponentFixture<EquipmentTotalsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EquipmentTotalsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EquipmentTotalsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
