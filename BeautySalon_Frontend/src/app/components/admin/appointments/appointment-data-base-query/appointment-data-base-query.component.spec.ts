import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppointmentDataBaseQueryComponent } from './appointment-data-base-query.component';

describe('AppointmentDataBaseQueryComponent', () => {
  let component: AppointmentDataBaseQueryComponent;
  let fixture: ComponentFixture<AppointmentDataBaseQueryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AppointmentDataBaseQueryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AppointmentDataBaseQueryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
