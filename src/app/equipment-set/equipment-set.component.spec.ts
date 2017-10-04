import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EquipmentSetComponent } from './equipment-set.component';

describe('EquipmentSetComponent', () => {
  let component: EquipmentSetComponent;
  let fixture: ComponentFixture<EquipmentSetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EquipmentSetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EquipmentSetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
