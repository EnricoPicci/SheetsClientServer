import {Component, OnInit} from 'angular2/core';

@Component({
    selector: 'short-long-text',
    template: `
         <span>{{getText()}}</span>
         <span (click)="toggle()" style="text-decoration: underline; color: #1BA2DC; cursor: pointer;">{{getToggleText()}}</span>
    `,
    inputs: ['longText', 'shortTextLength', 'shortText'],
})
export class ShortLongTextComponent {
    public longText: string;
    public shortText: string;
    public shortTextLength: number = 0;
    private _showShort: boolean = true;
    
    getText() {
        let ret: string;
        if (this._showShort) {
           ret = this.getShortText(); 
        } else {
           ret = this.longText;
        }
        //ret = ret + this.getToggleText();
        return ret;
    }
    
    getShortText() {
        let ret: string;
        if (this.shortTextLength > 0) {
            ret = this.longText.substring(0, this.shortTextLength);
        } else {
            ret = this.shortText;
        }
        return ret;
    }
    
    getToggleText() {
        let ret: string;
        if (this._showShort) {
           ret = '...see more'; 
        } else {
           ret = 'See less'; 
        }
        return ret;
    }
    
    toggle() {
        this._showShort = !this._showShort;
        console.log('short?' + this._showShort);
    }
}