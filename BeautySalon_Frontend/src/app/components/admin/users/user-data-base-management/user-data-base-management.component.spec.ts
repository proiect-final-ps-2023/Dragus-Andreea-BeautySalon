import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserDataBaseManagementComponent } from './user-data-base-management.component';

describe('UserDataBaseComponent', () => {
  let component: UserDataBaseManagementComponent;
  let fixture: ComponentFixture<UserDataBaseManagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserDataBaseManagementComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserDataBaseManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
