import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeDataBaseQueryComponent } from './employee-data-base-query.component';

describe('EmployeeDataBaseQueryComponent', () => {
  let component: EmployeeDataBaseQueryComponent;
  let fixture: ComponentFixture<EmployeeDataBaseQueryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmployeeDataBaseQueryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmployeeDataBaseQueryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
