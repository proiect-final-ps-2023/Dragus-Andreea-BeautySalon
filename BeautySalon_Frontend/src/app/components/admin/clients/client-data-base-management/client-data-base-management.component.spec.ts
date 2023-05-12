import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientDataBaseManagementComponent } from './client-data-base-management.component';

describe('ClientDataBaseManagementComponent', () => {
  let component: ClientDataBaseManagementComponent;
  let fixture: ComponentFixture<ClientDataBaseManagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClientDataBaseManagementComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClientDataBaseManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
