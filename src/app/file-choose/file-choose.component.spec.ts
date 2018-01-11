import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FileChooseComponent } from './file-choose.component';

describe('FileChooseComponent', () => {
  let component: FileChooseComponent;
  let fixture: ComponentFixture<FileChooseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FileChooseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FileChooseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
