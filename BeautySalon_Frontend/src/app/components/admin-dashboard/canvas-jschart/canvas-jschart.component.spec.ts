import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CanvasJSChartComponent } from './canvas-jschart.component';

describe('CanvasJSChartComponent', () => {
  let component: CanvasJSChartComponent;
  let fixture: ComponentFixture<CanvasJSChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CanvasJSChartComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CanvasJSChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
