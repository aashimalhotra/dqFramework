import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditChecksComponent } from './edit-checks.component';

describe('EditChecksComponent', () => {
  let component: EditChecksComponent;
  let fixture: ComponentFixture<EditChecksComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditChecksComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditChecksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
