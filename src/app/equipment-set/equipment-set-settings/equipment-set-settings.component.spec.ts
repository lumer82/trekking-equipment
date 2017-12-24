import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EquipmentSetSettingsComponent } from './equipment-set-settings.component';

describe('EquipmentSetSettingsComponent', () => {
  let component: EquipmentSetSettingsComponent;
  let fixture: ComponentFixture<EquipmentSetSettingsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EquipmentSetSettingsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EquipmentSetSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
