import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeDataBaseManagementComponent } from './employee-data-base-management.component';

describe('EmployeeDataBaseComponent', () => {
  let component: EmployeeDataBaseManagementComponent;
  let fixture: ComponentFixture<EmployeeDataBaseManagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmployeeDataBaseManagementComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmployeeDataBaseManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
