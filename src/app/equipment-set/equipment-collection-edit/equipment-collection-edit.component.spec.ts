import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EquipmentCollectionEditComponent } from './equipment-collection-edit.component';

describe('EquipmentCollectionEditComponent', () => {
  let component: EquipmentCollectionEditComponent;
  let fixture: ComponentFixture<EquipmentCollectionEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EquipmentCollectionEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EquipmentCollectionEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
