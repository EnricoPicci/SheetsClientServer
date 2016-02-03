System.register(['angular2/core', './sheetSummary.component'], function(exports_1) {
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1, sheetSummary_component_1;
    var SheetCollection;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (sheetSummary_component_1_1) {
                sheetSummary_component_1 = sheetSummary_component_1_1;
            }],
        execute: function() {
            SheetCollection = (function () {
                function SheetCollection() {
                    this.sheetSelectedChanged = new core_1.EventEmitter();
                }
                SheetCollection.prototype.selectionCriteriaChanged = function (inSheet) {
                    console.log(inSheet);
                    this.sheetSelectedChanged.next(inSheet);
                };
                __decorate([
                    core_1.Input(), 
                    __metadata('design:type', Array)
                ], SheetCollection.prototype, "sheets", void 0);
                __decorate([
                    core_1.Output(), 
                    __metadata('design:type', core_1.EventEmitter)
                ], SheetCollection.prototype, "sheetSelectedChanged", void 0);
                SheetCollection = __decorate([
                    core_1.Component({
                        selector: 'sheetCollectionCmp',
                        providers: [],
                        templateUrl: '../templates/sheetCollection.html',
                        styleUrls: ['../styles/table.css'],
                        directives: [sheetSummary_component_1.SheetSummaryComponent],
                        inputs: ['sheets'],
                    }), 
                    __metadata('design:paramtypes', [])
                ], SheetCollection);
                return SheetCollection;
            })();
            exports_1("SheetCollection", SheetCollection);
        }
    }
});
//# sourceMappingURL=SheetCollection.component.js.map