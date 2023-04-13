import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditmanagementComponent } from './editmanagement.component';

describe('EditmanagementComponent', () => {
  let component: EditmanagementComponent;
  let fixture: ComponentFixture<EditmanagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditmanagementComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditmanagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
