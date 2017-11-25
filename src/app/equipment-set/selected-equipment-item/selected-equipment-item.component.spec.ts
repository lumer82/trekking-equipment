import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectedEquipmentItemComponent } from './selected-equipment-item.component';

describe('SelectedEquipmentItemComponent', () => {
  let component: SelectedEquipmentItemComponent;
  let fixture: ComponentFixture<SelectedEquipmentItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelectedEquipmentItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectedEquipmentItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
