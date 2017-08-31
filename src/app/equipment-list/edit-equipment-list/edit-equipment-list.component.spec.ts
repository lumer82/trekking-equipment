import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditEquipmentListComponent } from './edit-equipment-list.component';

describe('EditEquipmentListComponent', () => {
  let component: EditEquipmentListComponent;
  let fixture: ComponentFixture<EditEquipmentListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditEquipmentListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditEquipmentListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
