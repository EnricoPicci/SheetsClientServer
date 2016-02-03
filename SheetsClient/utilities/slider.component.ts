///<reference path="../typings/nouislider/nouislider.d.ts" />

import {Component, ViewChild, AfterViewInit, OnChanges, Input, Output, EventEmitter} from 'angular2/core';

@Component({
  selector: 'my-slider',
  template: `
    <div id="preSlider" class="slider back noUi-base" [style.width]="getWidthFromZero()" [style.left]="getLeftForPreDiv()">
        <div class="noUi-marker noUi-marker-horizontal noUi-marker-large"></div>
        <div class="noUi-value noUi-value-horizontal noUi-value-large">0</div>
    </div>
    <div #sliderDomElement id="slider" class="slider" [style.left]="getLeft()" [style.width]="getWidth()"></div>
    <div id="postSlider"></div>
  `,
})

export class Slider { 
    @ViewChild('sliderDomElement') sliderDomElement;
    myNoUiSlider: any;
    @Input() start: number[];
    @Input() range: any;  //e.g. {'min': 0,'max': 100}
    @Input() pips: any; //e.g. {mode: 'values', values: [10, 20, 30, 40, 50, 60, 70, 80, 90], density: 10}
    @Input() newValue: any;
    @Input() locked: boolean = false;
    @Input() relativeStartOfScale: number = 0;
    @Output() end: EventEmitter<any> = new EventEmitter();
    public values: any[];
    
    public onEnd = (inValues: any[]) => {
        this.values = inValues;
        this.end.next(inValues);
    }
    
    ngAfterViewInit() {
        noUiSlider.create(this.sliderDomElement.nativeElement, 
          {start: this.start,
           tooltips: true,
           //connect: true,
           range: this.range,
           pips: this.pips
        });
        this.myNoUiSlider = this.sliderDomElement.nativeElement.noUiSlider;
        this.myNoUiSlider.on('change', this.onEnd); // register function onEnd() as callback for NoUiSlider
    }
    
    ngOnChanges() {
        if (this.myNoUiSlider != null) {
            if(this.newValue != null) {
                this.myNoUiSlider.set(this.newValue.newWeight);
            }
            if (this.locked) {
                this.sliderDomElement.nativeElement.setAttribute('disabled', true);
            } else {
                this.sliderDomElement.nativeElement.removeAttribute('disabled');
            } 
        }
    }
    
    ngOnDestroy() {
        this.myNoUiSlider.destroy();
    }
    
    getLeft() {
        let ret = this.relativeStartOfScale + this.range.min;
        return ret + '%';
    }
    
    getLeftForPreDiv() {
        let ret = this.relativeStartOfScale;
        return ret + '%';
    }
    
    getWidth() {
        let ret = (this.range.max - this.range.min) + '%';
        return ret;
    }    
    
    getWidthFromZero() {
        // ret = this.range.max + '%';
        let ret: string;
        let widthFromZero = this.relativeStartOfScale + this.range.max;
        if (widthFromZero < 100) {
            ret = this.range.max + '%';
        } else {  // we want to set a limit of 100 to the width from zero so that the html component does not expand outside its width
            ret = (100 - this.relativeStartOfScale) + '%';
        }
        return ret;
    }
    
    displayPreDiv() {
        // show the PreDiv html component only if we are NOT in the 'relative scale' mode, i.e. if
        // relativeStartOfScale is zero
        return (this.relativeStartOfScale == 0);
    }
    
}
