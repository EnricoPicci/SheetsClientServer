/// <reference path="../../typings/highcharts/highcharts.d.ts" />

declare var jQuery: any;

import {Directive, ElementRef, Input} from 'angular2/core';

@Directive({
    selector: '[ng2-highstocks]'
})
export class Ng2Highstocks {
    hostElement: ElementRef;
    chart: any;

    constructor(ele: ElementRef) {
        this.hostElement = ele;
    }

    @Input('ng2-highstocks') set options(opt: any) {
        if (!opt) {
            console.log('No valid options 1 ...');
            console.log(opt);
            return;
        }
        if (opt.series) {
            let nativeEl = this.hostElement.nativeElement;
            let jQ = jQuery(nativeEl);
            this.chart = jQ.highcharts('StockChart', opt);
        } else {
            console.log('No valid options...');
            console.dir(opt);
        }
    }
}
