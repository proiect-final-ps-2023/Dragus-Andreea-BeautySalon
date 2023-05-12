import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientDataBaseQueryComponent } from './client-data-base-query.component';

describe('ClientDataBaseQueryComponent', () => {
  let component: ClientDataBaseQueryComponent;
  let fixture: ComponentFixture<ClientDataBaseQueryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClientDataBaseQueryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClientDataBaseQueryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
