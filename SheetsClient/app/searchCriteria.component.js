System.register(['angular2/core', './searchCriteria'], function(exports_1) {
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1, searchCriteria_1;
    var SearchCriteriaComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (searchCriteria_1_1) {
                searchCriteria_1 = searchCriteria_1_1;
            }],
        execute: function() {
            SearchCriteriaComponent = (function () {
                function SearchCriteriaComponent() {
                    this.selectionCriteriaChanged = new core_1.EventEmitter();
                    this.open = false;
                }
                SearchCriteriaComponent.prototype.onChange = function (selected, selection) {
                    if (selection) {
                        selection.selected = selected;
                        this.selectionCriteriaChanged.next(this.searchCriteria);
                    }
                };
                SearchCriteriaComponent.prototype.onClickOverHeader = function () {
                    this.open = !this.open;
                };
                __decorate([
                    core_1.Input(), 
                    __metadata('design:type', searchCriteria_1.SearchCriteria)
                ], SearchCriteriaComponent.prototype, "searchCriteria", void 0);
                __decorate([
                    core_1.Output(), 
                    __metadata('design:type', core_1.EventEmitter)
                ], SearchCriteriaComponent.prototype, "selectionCriteriaChanged", void 0);
                SearchCriteriaComponent = __decorate([
                    core_1.Component({
                        selector: 'searchCriteria',
                        providers: [],
                        templateUrl: '../templates/searchCriteria.html',
                        styleUrls: ['../styles/common.css', '../styles/searchCriteria.css'],
                    }), 
                    __metadata('design:paramtypes', [])
                ], SearchCriteriaComponent);
                return SearchCriteriaComponent;
            })();
            exports_1("SearchCriteriaComponent", SearchCriteriaComponent);
        }
    }
});
//# sourceMappingURL=searchCriteria.component.js.map