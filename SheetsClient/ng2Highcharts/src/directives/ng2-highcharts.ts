/// <reference path="../../typings/highcharts/highcharts.d.ts" />

declare var jQuery: any;

import {Directive, ElementRef, Input} from 'angular2/core';

@Directive({
	selector: '[ng2-highcharts]'
})
export class Ng2Highcharts {
	hostElement: ElementRef;
	chart: HighchartsChartObject;

	constructor(ele: ElementRef) {
		this.hostElement = ele;
	}

	@Input('ng2-highcharts') set options(opt:HighchartsOptions) {
		if(!opt) {
			console.log('No valid options...');
			console.log(opt);
			return;
		}
		if(opt.series || opt.data) {
            let nativeEl = this.hostElement.nativeElement;
            let jQ = jQuery(nativeEl);
            this.chart = jQ.highcharts(opt);
		} else {
			console.log('No valid options...');
			console.dir(opt);
		}
	}
}
