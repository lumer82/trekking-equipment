import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditEquipmentSetSettingsComponent } from './edit-equipment-set-settings.component';

describe('EditEquipmentSetSettingsComponent', () => {
  let component: EditEquipmentSetSettingsComponent;
  let fixture: ComponentFixture<EditEquipmentSetSettingsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditEquipmentSetSettingsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditEquipmentSetSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
