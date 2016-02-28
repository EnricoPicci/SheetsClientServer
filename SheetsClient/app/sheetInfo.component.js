System.register(['angular2/core', 'angular2/router', '../utilities/stringNumericConverter'], function(exports_1) {
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1, router_1, stringNumericConverter_1;
    var SheetInfoComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            },
            function (stringNumericConverter_1_1) {
                stringNumericConverter_1 = stringNumericConverter_1_1;
            }],
        execute: function() {
            SheetInfoComponent = (function () {
                function SheetInfoComponent(_router) {
                    this._router = _router;
                }
                SheetInfoComponent.prototype.hasPositiveOneYearReturn = function () {
                    return this.hasPositiveReturn(this.sheet.oneYearReturn);
                };
                SheetInfoComponent.prototype.hasPositiveOneMonthReturn = function () {
                    return this.hasPositiveReturn(this.sheet.oneMonthReturn);
                };
                SheetInfoComponent.prototype.hasPositiveDailyChange = function () {
                    return this.hasPositiveReturn(this.sheet.dailyChange);
                };
                SheetInfoComponent.prototype.hasPositiveReturn = function (inReturn) {
                    return stringNumericConverter_1.StringNumericConverter.getNumberFromPercentageString(inReturn) >= 0;
                };
                SheetInfoComponent.prototype.onClickOverImage = function () {
                    this._router.navigate(['SheetDetail', { id: this.sheet.id }]);
                };
                SheetInfoComponent = __decorate([
                    core_1.Component({
                        selector: 'sheet-info',
                        providers: [],
                        templateUrl: '../templates/sheetInfo.html',
                        styleUrls: ['../styles/common.css', '../styles/sheetDetail.css', '../styles/sheetSummary.css'],
                        directives: [],
                        inputs: ['sheet'],
                    }), 
                    __metadata('design:paramtypes', [router_1.Router])
                ], SheetInfoComponent);
                return SheetInfoComponent;
            })();
            exports_1("SheetInfoComponent", SheetInfoComponent);
        }
    }
});
//# sourceMappingURL=sheetInfo.component.js.map