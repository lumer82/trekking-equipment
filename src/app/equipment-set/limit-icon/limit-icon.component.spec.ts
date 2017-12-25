import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LimitIconComponent } from './limit-icon.component';

describe('LimitIconComponent', () => {
  let component: LimitIconComponent;
  let fixture: ComponentFixture<LimitIconComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LimitIconComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LimitIconComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
