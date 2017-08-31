import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewEquipmentListComponent } from './new-equipment-list.component';

describe('NewEquipmentListComponent', () => {
  let component: NewEquipmentListComponent;
  let fixture: ComponentFixture<NewEquipmentListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewEquipmentListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewEquipmentListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
