import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagementloginComponent } from './managementlogin.component';

describe('ManagementloginComponent', () => {
  let component: ManagementloginComponent;
  let fixture: ComponentFixture<ManagementloginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManagementloginComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ManagementloginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
