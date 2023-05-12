import {AfterViewInit, Component, EventEmitter, Input, OnChanges, OnDestroy, Output} from '@angular/core';
declare var require: any;
var CanvasJS = require('./canvasjs.min');

@Component({
  selector: 'canvasjs-chart',
  template: '<div id="{{chartContainerId}}" [ngStyle]="styles"></div>',
  styleUrls: ['./canvas-jschart.component.css']
})

class CanvasJSChartComponent  implements AfterViewInit, OnChanges, OnDestroy{
  static _cjsChartContainerId = 0;
  chart: any;
  chartContainerId: any;
  prevChartOptions: any;
  shouldUpdateChart = false;

  @Input()
  options: any;
  @Input()
  styles: any;

  @Output()
  chartInstance = new EventEmitter<object>();

  constructor() {
    this.options = this.options ? this.options : {};
    this.styles = this.styles ? this.styles : { width: "100%", position: "relative" };
    this.styles.height = this.options.height ? this.options.height + "px" : "400px";

    this.chartContainerId = 'canvasjs-angular-chart-container-' + CanvasJSChartComponent._cjsChartContainerId++;
  }

  ngDoCheck() {
    if(this.prevChartOptions != this.options) {
      this.shouldUpdateChart = true;
    }
  }

  ngOnChanges() {
    //Update Chart Options & Render
    if(this.shouldUpdateChart && this.chart) {
      this.chart.options = this.options;
      this.chart.render();
      this.shouldUpdateChart = false;
      this.prevChartOptions = this.options;
    }
  }

  ngAfterViewInit() {
    this.chart = new CanvasJS.Chart(this.chartContainerId, this.options);
    this.chart.render();
    this.prevChartOptions = this.options;
    this.chartInstance.emit(this.chart);
  }

  ngOnDestroy() {
    if(this.chart)
      this.chart.destroy();
  }
}

export {
  CanvasJSChartComponent,
  CanvasJS
};

