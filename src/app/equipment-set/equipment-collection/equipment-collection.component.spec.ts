import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EquipmentCollectionComponent } from './equipment-collection.component';

describe('EquipmentCollectionComponent', () => {
  let component: EquipmentCollectionComponent;
  let fixture: ComponentFixture<EquipmentCollectionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EquipmentCollectionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EquipmentCollectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
