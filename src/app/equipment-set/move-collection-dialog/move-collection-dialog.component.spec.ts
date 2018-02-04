import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MoveCollectionDialogComponent } from './move-collection-dialog.component';

describe('MoveCollectionDialogComponent', () => {
  let component: MoveCollectionDialogComponent;
  let fixture: ComponentFixture<MoveCollectionDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MoveCollectionDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MoveCollectionDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
