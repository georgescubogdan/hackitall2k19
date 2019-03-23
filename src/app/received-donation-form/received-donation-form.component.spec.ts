import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReceivedDonationFormComponent } from './received-donation-form.component';

describe('ReceivedDonationFormComponent', () => {
  let component: ReceivedDonationFormComponent;
  let fixture: ComponentFixture<ReceivedDonationFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReceivedDonationFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReceivedDonationFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
