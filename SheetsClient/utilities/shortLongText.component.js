System.register(['angular2/core'], function(exports_1) {
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1;
    var ShortLongTextComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            }],
        execute: function() {
            ShortLongTextComponent = (function () {
                function ShortLongTextComponent() {
                    this.shortTextLength = 0;
                    this._showShort = true;
                }
                ShortLongTextComponent.prototype.getText = function () {
                    var ret;
                    if (this._showShort) {
                        ret = this.getShortText();
                    }
                    else {
                        ret = this.longText;
                    }
                    //ret = ret + this.getToggleText();
                    return ret;
                };
                ShortLongTextComponent.prototype.getShortText = function () {
                    var ret;
                    if (this.shortTextLength > 0) {
                        ret = this.longText.substring(0, this.shortTextLength);
                    }
                    else {
                        ret = this.shortText;
                    }
                    return ret;
                };
                ShortLongTextComponent.prototype.getToggleText = function () {
                    var ret;
                    if (this._showShort) {
                        ret = '...see more';
                    }
                    else {
                        ret = 'See less';
                    }
                    return ret;
                };
                ShortLongTextComponent.prototype.toggle = function () {
                    this._showShort = !this._showShort;
                    console.log('short?' + this._showShort);
                };
                ShortLongTextComponent = __decorate([
                    core_1.Component({
                        selector: 'short-long-text',
                        template: "\n         <span>{{getText()}}</span>\n         <span (click)=\"toggle()\" style=\"text-decoration: underline; color: #1BA2DC; cursor: pointer;\">{{getToggleText()}}</span>\n    ",
                        inputs: ['longText', 'shortTextLength', 'shortText'],
                    }), 
                    __metadata('design:paramtypes', [])
                ], ShortLongTextComponent);
                return ShortLongTextComponent;
            })();
            exports_1("ShortLongTextComponent", ShortLongTextComponent);
        }
    }
});
//# sourceMappingURL=shortLongText.component.js.map