import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BeautyServiceDataBaseManagementComponent } from './beauty-service-data-base-management.component';

describe('BeautyServiceDataBaseManagementComponent', () => {
  let component: BeautyServiceDataBaseManagementComponent;
  let fixture: ComponentFixture<BeautyServiceDataBaseManagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BeautyServiceDataBaseManagementComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BeautyServiceDataBaseManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
