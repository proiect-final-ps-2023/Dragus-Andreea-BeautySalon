import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BeautyServiceDataBaseQueryComponent } from './beauty-service-data-base-query.component';

describe('BeautyServiceDataBaseQueryComponent', () => {
  let component: BeautyServiceDataBaseQueryComponent;
  let fixture: ComponentFixture<BeautyServiceDataBaseQueryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BeautyServiceDataBaseQueryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BeautyServiceDataBaseQueryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
