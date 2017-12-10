import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditEquipmentItemComponent } from './edit-equipment-item.component';

describe('EditEquipmentItemComponent', () => {
  let component: EditEquipmentItemComponent;
  let fixture: ComponentFixture<EditEquipmentItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditEquipmentItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditEquipmentItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
