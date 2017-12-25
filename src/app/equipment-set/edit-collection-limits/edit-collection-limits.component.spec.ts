import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditCollectionLimitsComponent } from './edit-collection-limits.component';

describe('EditCollectionLimitsComponent', () => {
  let component: EditCollectionLimitsComponent;
  let fixture: ComponentFixture<EditCollectionLimitsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditCollectionLimitsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditCollectionLimitsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
