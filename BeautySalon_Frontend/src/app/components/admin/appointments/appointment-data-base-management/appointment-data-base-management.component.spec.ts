import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppointmentDataBaseManagementComponent } from './appointment-data-base-management.component';

describe('AppointmentDataBaseManagementComponent', () => {
  let component: AppointmentDataBaseManagementComponent;
  let fixture: ComponentFixture<AppointmentDataBaseManagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AppointmentDataBaseManagementComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AppointmentDataBaseManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
