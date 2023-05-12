import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserDataBaseQueryComponent } from './user-data-base-query.component';

describe('UserDataBaseQueryComponent', () => {
  let component: UserDataBaseQueryComponent;
  let fixture: ComponentFixture<UserDataBaseQueryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserDataBaseQueryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserDataBaseQueryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
