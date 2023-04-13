import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IpaymentComponent } from './ipayment.component';

describe('IpaymentComponent', () => {
  let component: IpaymentComponent;
  let fixture: ComponentFixture<IpaymentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IpaymentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IpaymentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
