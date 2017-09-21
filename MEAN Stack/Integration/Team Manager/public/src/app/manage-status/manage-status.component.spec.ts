import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageStatusComponent } from './manage-status.component';

describe('ManageStatusComponent', () => {
  let component: ManageStatusComponent;
  let fixture: ComponentFixture<ManageStatusComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManageStatusComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
