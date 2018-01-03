import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditEquipmentLimitDefinitionComponent } from './edit-equipment-limit-definition.component';

describe('EditEquipmentLimitDefinitionComponent', () => {
  let component: EditEquipmentLimitDefinitionComponent;
  let fixture: ComponentFixture<EditEquipmentLimitDefinitionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditEquipmentLimitDefinitionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditEquipmentLimitDefinitionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
